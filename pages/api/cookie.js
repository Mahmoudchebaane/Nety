import { Cookies } from 'universal-cookie';

export default function handler(req, res) {
  // Create a new instance of universal-cookie
  const cookies = new Cookies(req, res);

  // Set a cookie
  cookies.set('PrestaShop-7768c5e97d9f6121e567e3116355ab63', 'def50200a2002a676e3ab3cde4551c30b6a86ae43600ec4a4927f4f36d78143ad053e0eb38a3333cb883d0a1666afb2b666d6a2a9189ff78ae24e199121161ce2b5eedd3134fdeed472008f61155e7808f3da1fac2a0496c61c19d77cddd77c447c6cccc4ca5302ffc2b7c886d0710b978de925b2ef3196eb46ae5859aac0f706abb36d7acd8b8e46401556036bf7b7d46317bd5bd0939ba4c7a61430802ac9532d48023105bf97047d919056361aeba17777792a7aa3181658bba413a6ba7fb4bcd50b8253460b9b20bceb6ec69b21b35d96877a4;', { path: '/nety/' }); // Example: cookie named 'name' with value 'value' and available across the entire site
console.log("===after set==",cookies)
  // Send a response
  res.status(200).json({ message: 'Cookie set successfully' });
}