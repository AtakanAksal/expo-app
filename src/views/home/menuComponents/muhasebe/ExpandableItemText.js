const expandableItemText = ( value, item ) => {
  // Fatura Filtreleme Item ları için
  if (value === "Seri No") {
    return item.invoice_serial_number;
  }
  if (value === "Hizmet Kodu") {
    return item.order.orderproducts[0].price.code;
  }
  if (value === "İşlem Kodu") {
    return item.bank_operation_code;
  }
  if (value === "Sipariş Kodu") {
    return item.bank_order_code;
  }
  if (value === "Referans No") {
    return item.bank_reference_no;
  }
  if (value === "Ödeme Tipi") {
    return item.order.payment_type.name;
  }
  if (value === "Tutar") {
    return item.amount;
  }

  // Tahsilat Makbuzu Filtreleme Item ları için
  if (value === "Firma İsmi") {
    return item.user.userdetail.company_name;
  }
  if (value === "Tahsilat Konusu") {
    return item.invoice_serial_number;
  }
  // if(value ==="Seri No"){
  //   return(
  //     item.invoice_serial_number
  //     )
  // }
  if (value === "Sicil No") {
    return item.bank_order_code;
  }

  // Banka Hesap Bilgileri Filtreleme Item ları için
  if (value === "Hesap Adı") {
    return item.invoice_serial_number;
  }
  if (value === "Banka Adı") {
    return item.invoice_serial_number;
  }
  if (value === "Şube") {
    return item.invoice_serial_number;
  }
  if (value === "Ülke") {
    return item.invoice_serial_number;
  }
  if (value === "İl") {
    return item.invoice_serial_number;
  }
  if (value === "İlçe") {
    return item.invoice_serial_number;
  }

  // Gelirler
  if (value === "Yayın Durumu") {
    return item.invoice_serial_number;
  }
  if (value === "Modül Seçimi") {
    return item.invoice_serial_number;
  }
  if (value === "Sipariş Türü") {
    return item.invoice_serial_number;
  }
  if (value === "Sipariş Tutarı") {
    return item.invoice_serial_number;
  }
  if (value === "Sipariş Kuru Seçimi") {
    return item.invoice_serial_number;
  }
  if (value === "Tahsilat Tutarı") {
    return item.invoice_serial_number;
  }
  if (value === "Tahsilat Kuru") {
    return item.invoice_serial_number;
  }

  // Giderler
  if (value === "Yayın Durumu") {
    return item.invoice_serial_number;
  }
  if (value === "Modül Seçimi") {
    return item.invoice_serial_number;
  }
  if (value === "Gider Türü") {
    return item.invoice_serial_number;
  }
  if (value === "Gider Tutarı") {
    return item.invoice_serial_number;
  }
  if (value === "Gider Kuru") {
    return item.invoice_serial_number;
  }
  if (value === "Tahsilat Tutarı") {
    return item.invoice_serial_number;
  }
  if (value === "Tahsilat Kuru") {
    return item.invoice_serial_number;
  }
  return "";
};
export default expandableItemText;
