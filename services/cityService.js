// services/cityService.js
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  orderBy,
  updateDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { getCurrentWeather } from "./weatherService";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Tambah kota ke daftar tersimpan user
 */
export const saveCity = async (cityName) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User belum login");
    }

    // Format city name untuk query
    const formattedCityName = cityName.trim();

    // Cek apakah kota sudah ada di daftar user
    const existingCity = await getCityByName(user.uid, formattedCityName);
    if (existingCity) {
      throw new Error("Kota sudah ada di daftar tersimpan");
    }

    // Ambil data cuaca kota
    const weatherData = await getCurrentWeather(formattedCityName);
    if (!weatherData) {
      throw new Error("Gagal mendapatkan data cuaca kota");
    }

    // Simpan ke Firestore
    const cityRef = collection(db, "savedCities");
    const docRef = await addDoc(cityRef, {
      userId: user.uid,
      cityName: formattedCityName,
      country: weatherData.sys.country,
      weatherData: {
        temperature: Math.round(weatherData.main.temp),
        description: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: Number(weatherData.wind.speed.toFixed(1)),
        icon: weatherData.weather[0].icon,
      },
      createdAt: Timestamp.now(),
      lastUpdated: Timestamp.now(),
    });

    // Update cache
    await updateCitiesCache(user.uid);

    return {
      success: true,
      cityId: docRef.id,
      city: {
        id: docRef.id,
        name: formattedCityName,
        country: weatherData.sys.country,
        temperature: Math.round(weatherData.main.temp),
        description: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: Number(weatherData.wind.speed.toFixed(1)),
        icon: weatherData.weather[0].icon,
      },
    };
  } catch (error) {
    console.error("Error saving city:", error);
    throw error;
  }
};

/**
 * Ambil semua kota tersimpan user
 */
export const getSavedCities = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      return { success: false, error: "User belum login", cities: [] };
    }

    // Coba ambil dari cache dulu
    const cachedCities = await getCachedCities(user.uid);
    if (cachedCities.length > 0) {
      return { success: true, cities: cachedCities, fromCache: true };
    }

    // Ambil dari Firestore
    const citiesRef = collection(db, "savedCities");
    const q = query(
      citiesRef,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const cities = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      cities.push({
        id: doc.id,
        name: data.cityName,
        country: data.country,
        temperature: data.weatherData?.temperature,
        description: data.weatherData?.description,
        humidity: data.weatherData?.humidity,
        windSpeed: data.weatherData?.windSpeed,
        icon: data.weatherData?.icon,
        createdAt: data.createdAt?.toDate(),
        lastUpdated: data.lastUpdated?.toDate(),
      });
    });

    // Simpan ke cache
    await AsyncStorage.setItem(`cities_${user.uid}`, JSON.stringify(cities));

    return { success: true, cities };
  } catch (error) {
    console.error("Error getting cities:", error);

    // Fallback ke cache jika ada
    try {
      const user = auth.currentUser;
      if (user) {
        const cachedCities = await getCachedCities(user.uid);
        return { success: true, cities: cachedCities, fromCache: true };
      }
    } catch (cacheError) {
      console.error("Cache error:", cacheError);
    }

    return { success: false, error: error.message, cities: [] };
  }
};

/**
 * Hapus kota dari daftar tersimpan
 */
export const deleteCity = async (cityId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User belum login");
    }

    // Verifikasi bahwa kota milik user ini
    const cityRef = doc(db, "savedCities", cityId);
    const cityDoc = await getDoc(cityRef);

    if (!cityDoc.exists()) {
      throw new Error("Kota tidak ditemukan");
    }

    const cityData = cityDoc.data();
    if (cityData.userId !== user.uid) {
      throw new Error("Anda tidak memiliki izin");
    }

    await deleteDoc(cityRef);

    // Update cache
    await updateCitiesCache(user.uid);

    return { success: true };
  } catch (error) {
    console.error("Error deleting city:", error);
    throw error;
  }
};

/**
 * Update data cuaca kota
 */
export const updateCityWeather = async (cityId) => {
  try {
    const cityRef = doc(db, "savedCities", cityId);
    const cityDoc = await getDoc(cityRef);

    if (!cityDoc.exists()) {
      throw new Error("Kota tidak ditemukan");
    }

    const data = cityDoc.data();
    const weatherData = await getCurrentWeather(data.cityName);

    if (!weatherData) {
      throw new Error("Gagal memperbarui data cuaca");
    }

    await updateDoc(cityRef, {
      weatherData: {
        temperature: Math.round(weatherData.main.temp),
        description: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: Number(weatherData.wind.speed.toFixed(1)),
        icon: weatherData.weather[0].icon,
      },
      lastUpdated: Timestamp.now(),
    });

    // Update cache
    const user = auth.currentUser;
    if (user) {
      await updateCitiesCache(user.uid);
    }

    return {
      success: true,
      updatedData: {
        temperature: Math.round(weatherData.main.temp),
        description: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: Number(weatherData.wind.speed.toFixed(1)),
        icon: weatherData.weather[0].icon,
      },
    };
  } catch (error) {
    console.error("Error updating city weather:", error);
    throw error;
  }
};

/**
 * Helper Functions
 */
const getCityByName = async (userId, cityName) => {
  try {
    const citiesRef = collection(db, "savedCities");
    const q = query(
      citiesRef,
      where("userId", "==", userId),
      where("cityName", "==", cityName)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
      };
    }
    return null;
  } catch (error) {
    console.error("Error checking city:", error);
    return null;
  }
};

const getCachedCities = async (userId) => {
  try {
    const cached = await AsyncStorage.getItem(`cities_${userId}`);
    return cached ? JSON.parse(cached) : [];
  } catch (error) {
    console.error("Error getting cached cities:", error);
    return [];
  }
};

const updateCitiesCache = async (userId) => {
  try {
    const citiesRef = collection(db, "savedCities");
    const q = query(
      citiesRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const cities = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      cities.push({
        id: doc.id,
        name: data.cityName,
        country: data.country,
        temperature: data.weatherData?.temperature,
        description: data.weatherData?.description,
        humidity: data.weatherData?.humidity,
        windSpeed: data.weatherData?.windSpeed,
        icon: data.weatherData?.icon,
        createdAt: data.createdAt?.toDate(),
        lastUpdated: data.lastUpdated?.toDate(),
      });
    });

    await AsyncStorage.setItem(`cities_${userId}`, JSON.stringify(cities));
  } catch (error) {
    console.error("Error updating cache:", error);
  }
};

/**
 * Hitung total kota tersimpan user
 */
export const getSavedCitiesCount = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return 0;

    const citiesRef = collection(db, "savedCities");
    const q = query(citiesRef, where("userId", "==", user.uid));
    const snapshot = await getDocs(q);

    return snapshot.size; //ini untuk hitung jumlah dokumen
  } catch (error) {
    console.error("getSavedCitiesCount error:", error);
    return 0;
  }
};
