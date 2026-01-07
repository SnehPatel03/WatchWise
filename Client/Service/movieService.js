import axios from "axios";

export const getMovieRecommendation = async (preferences) => {
  try {
    const res = await axios.post(
      "https://watchwise-5hnp.onrender.com/preferences",
      preferences,
      { timeout: 20000 } // wait for sleeping backend
    );
    return res.data;
  } catch (error) {
    console.error("Movie recommendation error:", error);

    // Retry once if backend was sleeping
    if (error.code === "ERR_NETWORK") {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const retryRes = await axios.post(
        "https://watchwise-5hnp.onrender.com/preferences",
        preferences,
        { timeout: 20000 }
      );

      return retryRes.data;
    }

    throw new Error("Failed to fetch movie recommendations");
  }
};
