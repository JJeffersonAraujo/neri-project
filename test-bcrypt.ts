import bcrypt from "bcrypt";

const hash = "$2b$10$pJnHvlY9HA8f5Pu8rxVj1e6EmuMmWZf7zQ77xnodnfXlN3pn88Rh.";

(async () => {
  const ok = await bcrypt.compare("12345678", hash);
  console.log("MATCH:", ok);
})();
