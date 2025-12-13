import React, { useState } from "react";
import { motion } from "framer-motion";
 
import { Phone, MapPin, LucideUserCog2, BookOpen } from "lucide-react";

export default function AboutPage({
  whatsappNumber = "+967771924870",
  whatsappMessage = "مرحبًا! أود الاستفسار عن خدماتكم.",
}) {
  const waHref = `https://wa.me/${whatsappNumber.replace(
    /[^0-9]/g,
    ""
  )}?text=${encodeURIComponent(whatsappMessage)}`;

  const [openChat, setOpenChat] = useState(false);
  const [message, setMessage] = useState(whatsappMessage);

  const sendWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber.replace(
      /[^0-9]/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

 

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 mt-24">
      {/* HEADER */}
 
        <header className="  flex justify-center  bg-white shadow-sm mx-10  rounded-lg  ">
          <div className=" mx-auto   max-w-6xl px-6 py-8 rounded-xl  ">
    
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-5 "
            >
              <BookOpen  className="text-amber-600 size-10 sm:size-12" />
              <h1 className="sm:text-3xl font-bold text-slate-800 tracking-wide text-[20px]">
                Khalid Bin Al-Waleed Library
              </h1>
            </motion.div>
          </div>
        </header>
 

      {/* MAIN SECTION */}
      <main className="mx-auto max-w-6xl px-6 py-12">

        
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className=" text-gray-500  text-[24px] font-bold">من نحن</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold leading-tight">
              نبني مكتبة خبرة وثقة
            </h2>
            <p className="mt-6 text-gray-700 leading-relaxed text-[20px]">
              مكتبة خالد بن الوليد تأسست بهدف نشر المعرفة وتسهيل الوصول إلى
              الكتب المختارة في الأدب والتاريخ والعلوم والتنمية الذاتية.
            </p>
 
          </motion.div>

          {/* RIGHT BOX */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-md"
          >
            <div className="space-y-4">
              {/* رؤية */}
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-xl bg-primary-50 grid place-items-center text-primary-600">
                  <svg className="h-8 w-8" viewBox="0 0 24 24">
                    <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5V6.5A2.5 2.5 0 0 0 17.5 4h-11A2.5 2.5 0 0 0 4 6.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">رؤيتنا</h3>
                  <p className="text-gray-600 mt-1">
                    أن نصبح المرجع الأول لعشّاق القراءة في المنطقة.
                  </p>
                </div>
              </div>

              {/* مهمة */}
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-xl bg-primary-50 grid place-items-center text-primary-600">
                  <svg className="h-8 w-8" viewBox="0 0 24 24">
                    <path d="M12 2v20" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">مهمتنا</h3>
                  <p className="text-gray-600 mt-1">
                    تجربة سهلة وسريعة للوصول للكتب المختارة.
                  </p>
                </div>
              </div>

              {/* قيم */}
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-xl bg-primary-50 grid place-items-center text-primary-600">
                  <svg className="h-8 w-8" viewBox="0 0 24 24">
                    <path d="M3 12h18" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">قيمنا</h3>
                  <p className="text-gray-600 mt-1">
                    احترام القارئ، الجودة، الالتزام.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* TEAM + INFO */}
        <section className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold">عن المكتبة</h3>
            <p className="mt-4 text-gray-700 leading-relaxed">
              نقدم مجموعة مختارة بعناية من الكتب الورقية والإلكترونية، مع خدمة
              شحن محلية وخيارات للمؤسسات والمدارس.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">كتب متاحة</p>
                <p className="mt-2 text-2xl font-bold">1,250+</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">عملاء سعداء</p>
                <p className="mt-2 text-2xl font-bold">8,400+</p>
              </div>
            </div>
          </div>

          {/* CONTACT SIDE */}
          <aside className="bg-white rounded-2xl p-6 shadow-sm">
            <h4 className="font-semibold">Content us</h4>

            <div className="mt-4 space-y-3">
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg border p-3 hover:shadow"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    d="M20.52 3.48A11.86 11.86 0 0 0 12 0C5.37 0 .01 5.42.01 12.09c0 2.13.56 4.2 1.62 6.02L0 24l6.17-1.6A11.9 11.9 0 0 0 12 24c6.63 0 12-5.42 12-12.09a11.86 11.86 0 0 0-3.48-8.43z"
                    fill="#25D366"
                  />
                </svg>
                <div>
                 
                  <p className="text-xs text-gray-500">{whatsappNumber}</p>
                </div>
              </a>

              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Phone className="w-6 h-6" />
                <div>
               
                  <p className="text-xs text-gray-500">+769 771 924 870</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border p-3">
                <MapPin className="w-6 h-6" />
                <div>
            
                  <p className="text-xs text-gray-500">
                Yemn-sana'a
                  </p>
                </div>
              </div>
            </div>
          </aside>
          
        </section>
        
      </main>
      {/* LucideUserCog2, LucideUserCog22, */}
    <div className="  flex  justify-center mb-1 relative group">
      <a href="https://dev-salman--protiflio.web.app" target="blank">
        <button
     
        className="
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-blue-600 text-white
        shadow-lg
        hover:bg-blue-700
       
        hover:scale-110
        devlober
        transition-transform duration-500
        focus:outline-none focus:ring-2 focus:ring-blue-400 
      "

      >
        <LucideUserCog2 className="w-7 h-7" />
      </button></a>

        <span className="absolute flex  justify-center -translate-x-1/2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              Countent with Devlober
            </span>

    </div>
      {/* FOOTER */}
      <footer className="bg-white border-t">
        <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
         كل الحقوق محفوظة.     © {new Date().getFullYear()} مكتبة خالد بن الوليد.
           
          </p>
          {/* <div className="text-sm text-gray-600">صمم بتقنية حديثة</div> */}
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setOpenChat(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-600 shadow-lg grid place-items-center text-white hover:scale-105 transition-all"
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24">
          <path
            d="M20.52 3.48A11.86 11.86 0 0 0 12 0C5.37 0 .01 5.42.01 12.09c0 2.13.56 4.2 1.62 6.02L0 24l6.17-1.6A11.9 11.9 0 0 0 12 24c6.63 0 12-5.42 12-12.09a11.86 11.86 0 0 0-3.48-8.43z"
            fill="#fff"
          />
        </svg>
      </button>

      {/* WhatsApp Chat Modal */}
      {openChat && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-fadeIn">
            <h3 className="text-xl font-semibold text-center">
              التواصل عبر واتس آب
            </h3>
            <p className="text-gray-500 text-sm text-center mt-1">
              اكتب رسالتك ليتم إرسالها مباشرة
            </p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-4 w-full h-32 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm"
              placeholder="اكتب رسالتك هنا..."
            ></textarea>

            <div className="mt-4 flex justify-between gap-3">
              <button
                onClick={() => setOpenChat(false)}
                className="flex-1 py-2 rounded-xl border text-gray-600 hover:bg-gray-50"
              >
                إغلاق
              </button>

              <button
                onClick={sendWhatsApp}
                className="flex-1 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
              >
                إرسال
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
