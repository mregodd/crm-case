
# CRM Project

Bu proje, bir müşteri ilişkileri yönetimi (CRM) sistemi geliştirme case çalışmasıdır.  
Backend: .NET Core + PostgreSQL  
Frontend: React + MUI (Material-UI)

---

## 🚀 Projenin Amacı

Bu CRM sistemi, müşteri verilerini yönetmek için temel CRUD operasyonlarını, kullanıcı yetkilendirmesini ve gelişmiş filtreleme özelliklerini sunar.  
Amaç, modern bir mimari kullanarak hem backend hem frontend tarafında güçlü, genişletilebilir bir yapı kurmak.

---

## 📦 Proje Yapısı

```
crm-project/
├── Crm.Api               → Sunum (presentation) katmanı, API endpoint'leri
├── Crm.Application       → Uygulama servisleri (şu an boş, genişletilebilir)
├── Crm.Domain           → Domain modelleri, entity sınıfları
├── Crm.Infrastructure    → Veritabanı erişimi, DbContext, repository implementasyonları
├── crm-frontend          → React frontend uygulaması
```

---

## 🏗 Backend (.NET Core)

- **Dil:** C#
- **Framework:** .NET Core
- **Veritabanı:** PostgreSQL
- **Teknikler:**  
  ✅ JWT Authentication  
  ✅ Role-based Authorization (Admin rolü)  
  ✅ CRUD API endpoint'leri  
  ✅ Gelişmiş filtreleme (name, email, region, registration date)  
  ✅ ILogger ile loglama  
  ✅ FluentValidation ile input validasyonu  
  ✅ (Hazır ama kullanılmayan) Application katmanı, clean architecture genişletmeye uygun  

**Çalıştırmak için:**  
```bash
cd Crm.Api
dotnet ef database update   # migration uygula
dotnet run                  # API başlat
```

---

## 💻 Frontend (React)

- **Framework:** React.js + Vite
- **Kütüphaneler:** Axios, Material-UI (MUI), React Router, Recharts
- **Fonksiyonlar:**  
  ✅ Kullanıcı login ekranı  
  ✅ JWT token ile korunan müşteri yönetim ekranları  
  ✅ Tablo görünümü (MUI DataGrid)  
  ✅ Canlı filtreleme ve arama  
  ✅ Müşteri ekleme, düzenleme, silme  
  ✅ Dashboard ekranında özet bilgiler + grafikler

**Çalıştırmak için:**  
```bash
cd crm-frontend
npm install
npm run dev
```


## 🔒 Güvenlik

- JWT tabanlı authentication.
- Admin rolüne özel endpoint erişimi.
- Parola hashleme (detaya göre iyileştirilebilir).
- Hatalara karşı try-catch ve detaylı loglama.
- CORS yapılandırması (deployment için dikkat edilmesi gereken).

---

## 🔧 Branch ve Git Stratejisi

- **main:** Final, stabil sürüm.  
- **development:** Aktif geliştirme yapılır.  
- **Pull Request:** Development'tan main'e merge yapılırken açıklayıcı PR mesajı yazılır.

---

## ✨ Geliştirme Önerileri

✅ Application katmanını aktif hale getirerek servis mimarisi kurmak.  
✅ Logger yapısını Serilog gibi gelişmiş bir sisteme taşımak.  
✅ Unit testler ve entegrasyon testleri eklemek.  
✅ Token güvenliğini geliştirmek (refresh token, cookie-based opsiyonlar).  
✅ Deployment aşamasında HTTPS ve production config ayarlarını tamamlamak.

---

## 👤 Katkıda Bulunan

- 💻 **Geliştirici:** Egemen Derbedek (GitHub repo sahibi)  
