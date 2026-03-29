export type DashboardTheme = {
  rootBg: string;
  overlayGradient: string;
  blobs: {
    topLeft: string;
    topRight: string;
    bottom: string;
  };
};

export const DASHBOARD_THEMES: Record<string, DashboardTheme> = {
  pastelBalanced: {
    rootBg: "#F4EFE7",
    overlayGradient:
      // 🔁 invertimos posiciones
      "radial-gradient(circle at top right, rgba(255, 128, 64, 0.19), transparent 36%), \
       radial-gradient(circle at top left, rgba(181, 102, 214, 0.15), transparent 30%), \
       radial-gradient(circle at bottom center, rgba(255, 223, 106, 0.15), transparent 32%)",

    blobs: {
      // 🔁 también invertimos blobs
      topLeft: "bg-[#C792EA]/26",   // morado ahora a la izquierda
      topRight: "bg-[#FFA070]/30",  // naranja ahora a la derecha ✅
      bottom: "bg-[#FFE07A]/28",
    },
  },

  loginWarm: {
    rootBg: "#F3EFE8",
    overlayGradient:
      "radial-gradient(circle at top right, rgba(255, 132, 76, 0.18), transparent 36%), \
       radial-gradient(circle at top left, rgba(177, 109, 214, 0.16), transparent 30%), \
       radial-gradient(circle at bottom center, rgba(255, 220, 120, 0.14), transparent 32%)",
    blobs: {
      topLeft: "bg-[#C79AE8]/28",
      topRight: "bg-[#FF9D6C]/30",
      bottom: "bg-[#FFE08A]/30",
    },
  },

  creamSoft: {
    rootBg: "#F5F1EA",
    overlayGradient:
      "radial-gradient(circle at top right, rgba(255, 153, 102, 0.16), transparent 34%), \
       radial-gradient(circle at top left, rgba(191, 138, 219, 0.13), transparent 28%), \
       radial-gradient(circle at bottom center, rgba(255, 214, 122, 0.12), transparent 30%)",
    blobs: {
      topLeft: "bg-[#D2AFE9]/24",
      topRight: "bg-[#FFB089]/26",
      bottom: "bg-[#FFE59A]/26",
    },
  },

  neutralClean: {
    rootBg: "#F1EEE8",
    overlayGradient:
      "radial-gradient(circle at top right, rgba(255, 145, 90, 0.10), transparent 34%), \
       radial-gradient(circle at bottom left, rgba(199, 154, 232, 0.10), transparent 30%)",
    blobs: {
      topLeft: "bg-[#E1C8F3]/18",
      topRight: "bg-[#FFD2B8]/18",
      bottom: "bg-[#F7E7B2]/16",
    },
  },

  peachBrand: {
    rootBg: "#F6F0E7",
    overlayGradient:
      "radial-gradient(circle at top right, rgba(255, 120, 58, 0.20), transparent 35%), \
       radial-gradient(circle at top left, rgba(170, 95, 205, 0.15), transparent 28%), \
       radial-gradient(circle at bottom center, rgba(255, 214, 92, 0.14), transparent 30%)",
    blobs: {
      topLeft: "bg-[#C68BE8]/26",
      topRight: "bg-[#FF9966]/32",
      bottom: "bg-[#FFD86B]/28",
    },
  },
};

// ✅ activo
export const ACTIVE_DASHBOARD_THEME = "pastelBalanced";