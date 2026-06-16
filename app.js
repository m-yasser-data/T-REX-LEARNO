const libraryEl = document.getElementById("library");
const searchInput = document.getElementById("searchInput");

function renderLibrary(searchTerm = "") {
  // تفريغ المحتوى قبل إعادة البناء
  libraryEl.innerHTML = "";

  libraryData.forEach(term => {
    // تصفية المواد بناءً على نص البحث
    const filteredSubjects = term.subjects.filter(subject =>
      subject.name.includes(searchTerm)
    );

    // تجاوز الترم بالكامل لو مفيش فيه مواد مطابقة للبحث
    if (filteredSubjects.length === 0) return;

    const section = document.createElement("section");
    section.className = "bg-gray-900 border border-gray-800 rounded-3xl p-5 shadow-lg";

    // بناء واجهة المواد والملفات اللي جواها
    const subjectsHtml = filteredSubjects.map(subject => `
      <div class="bg-gray-800 rounded-xl p-4">
        <h3 class="text-xl font-semibold mb-2">${subject.name}</h3>
        
        ${subject.files.length > 0 ? `
          <ul class="space-y-2 mt-3 border-t border-gray-700 pt-3">
            ${subject.files.map(file => `
              <li>
                <a href="${file.link}" class="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 transition-colors">
                  📄 ${file.title}
                </a>
              </li>
            `).join("")}
          </ul>
        ` : `<p class="text-gray-500 text-sm mt-2">لا توجد ملفات حالياً</p>`}
      </div>
    `).join("");

    section.innerHTML = `
      <h2 class="text-2xl font-bold text-blue-400 mb-4">
        ${term.term}
      </h2>
      <div class="grid gap-3">
        ${subjectsHtml}
      </div>
    `;

    libraryEl.appendChild(section);
  });

  // إظهار رسالة توضيحية في حالة عدم وجود أي نتائج للبحث
  if (libraryEl.innerHTML === "") {
    libraryEl.innerHTML = `<p class="text-center text-gray-500 py-8 text-lg">مفيش مادة بالاسم ده في النظام، اتأكد من الكلمة.</p>`;
  }
}

// عرض المكتبة لأول مرة عند تحميل الصفحة
renderLibrary();

// تشغيل دالة العرض مع كل حرف بيتكتب في مربع البحث
searchInput.addEventListener("input", (e) => {
  renderLibrary(e.target.value);
});

