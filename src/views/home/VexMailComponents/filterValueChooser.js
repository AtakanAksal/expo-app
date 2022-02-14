const filterValueChooser = ( key ) => {
    switch (key) {
      case "Seri No":
        return "invoice_serial_number";
      case "Hizmet Kodu":
        return "userdetail.company_name";
      case "İşlem Kodu":
        return "x";
      case "Sipariş Kodu":
        return "x";
      case "Referans No":
        return "x";
      case "Ödeme Tipi":
        return "x";
      case "Tutar":
        return "invoice_serial_number";
      case "Firma İsmi":
        return "userdetail.company_name";
      case "Tahsilat Konusu":
        return "x";
      case "Sicil No":
        return "x";
      case "Hesap Adı":
        return "x";
      case "Banka Adı":
        return "x";
      case "Şube":
        return "invoice_serial_number";
      case "Ülke":
        return "userdetail.company_name";
      case "İl":
        return "x";
      case "İlçe":
        return "x";
      case "Yayın Durumu":
        return "x";
      case "Modül Seçimi":
        return "x";
      case "Sipariş Türü":
          return "invoice_serial_number";
      case "Sipariş Tutarı":
          return "userdetail.company_name";
      case "Sipariş Kuru Seçimi":
          return "x";
      case "Tahsilat Tutarı":
          return "x";
      case "Tahsilat Kuru":
          return "x";
      case "Gider Türü":
            return "invoice_serial_number";
      case "Gider Tutarı":
            return "userdetail.company_name";
      case "Gider Kuru":
            return "x";
        
        
      default:
        return null;
    }
  };
  export default filterValueChooser;