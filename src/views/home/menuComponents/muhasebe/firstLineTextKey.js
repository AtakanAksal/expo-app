const firstLineTextKey = ( activeState ) => {
    switch (activeState) {
      case "Muhasebe - Fatura":
        return "Seri No";
      case "Muhasebe - Tahsilat Makbuzu":
        return "Firma İsmi";
      case "Muhasebe - Banka Hesap Bilgileri":
        return "Firma İsmi";
      case "Muhasebe - Gelirler":
        return "Durum";
      case "Muhasebe - Giderler":
        return "Durum";
      case "Muhasebe - İptal & İade":
        return "Seri No";
      default:
        return null;
    }
  };
  export default firstLineTextKey;