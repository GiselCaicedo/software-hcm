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
    rootBg: "#FAFAFA",
    overlayGradient: "none",
    blobs: {
      topLeft: "bg-[#C792EA]/20",
      topRight: "bg-[#FFA070]/22",
      bottom: "bg-[#FFE07A]/20",
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

  // Fondo blanco con matices verdes/teal muy suaves — estilo referencia
  whiteGreen: {
    rootBg: "#F7F9F7",
    overlayGradient:
      "radial-gradient(circle at top right, rgba(134, 197, 156, 0.13), transparent 40%), \
       radial-gradient(circle at top left, rgba(100, 185, 170, 0.10), transparent 35%), \
       radial-gradient(circle at bottom center, rgba(160, 210, 180, 0.08), transparent 40%)",
    blobs: {
      topLeft: "bg-[#A8D8C0]/14",
      topRight: "bg-[#7EC8B4]/12",
      bottom: "bg-[#B8DFC8]/10",
    },
  },
};

// ✅ activo
export const ACTIVE_DASHBOARD_THEME = "pastelBalanced";