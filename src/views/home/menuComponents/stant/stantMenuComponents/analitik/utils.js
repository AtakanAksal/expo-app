// eslint-disable-next-line import/prefer-default-export

export const defineCodeFullName = (analaticState) => {
    switch (analaticState) {
        case "Ülke":
          return "country_name";
        case "Sektör":
          return "sector_name";
        case "Etkileşim":
          return "sector_count";
        case "Gün":
          return "sector_count";
        case "KullanıcıTürü":
          return "user_type";
        case "Cinsiyet":
          return "gender_type";
          default:
            return "";
        }
  }
  export const defineCountName = (analaticState) => {   
    switch (analaticState) {
        case "Ülke":
          return "country_count";
        case "Sektör":
          return "sector_count";
        case "Etkileşim":
          return "sector_count";
        case "Gün":
          return "sector_count";
        case "KullanıcıTürü":
          return "role_count";
        case "Cinsiyet":
          return "gender_type_count";
          default:
            return "";
        }
}  
export const headerDefiner = (analaticState) => {   
  switch (analaticState) {
      case "Ülke":
        return "Ülkeye Göre Filtrele";
      case "Sektör":
        return "Sektöre Göre Filtrele";
      case "Etkileşim":
        return "Etkileşime Göre Filtrele";
      case "Gün":
        return "Güne Göre Filtrele";
      case "KullanıcıTürü":
        return "Kullanıcı Türüne Göre Filtrele";
      case "Cinsiyet":
        return "Cinsiyete Göre Filtrele";
        default:
          return "";
      }
}  