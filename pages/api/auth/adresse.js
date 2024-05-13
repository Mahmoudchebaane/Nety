// Get specifie address by Id 
export async function getAdresse(cookie, id_adress) {
  const URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL_API;
  console.log("check" + id_adress);
  const response = await fetch(`${URL}/rest/address?id_address=${id_adress}`, {
    method: "GET",
    headers: {
      Cookie: cookie,
    },
  });
  const responseAdresse = await response.json();
  if (response.ok) {
    return responseAdresse;
  } else {
    console.log("Utilisateur non authentifié");
    return null;
  }
}
// Get all adresse of user acount
export async function getAllAdresse(cookie) {
  const URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL_API;
  const response = await fetch(`${URL}/rest/alladdresses`, {
    method: "GET",
    headers: {
      Cookie: cookie,
    },
    
  });
  console.log("reponse de all adresse",response);
  const allAdresses = await response.json();
  if (response.ok) {
    return  allAdresses;
  } else {
    throw new Error(allAdresses.message || `Error when getting adresses`);

  }
}

// add an address to the user's account
export async function addNewAddress(cookie, body) {
  //console.log('body',body)
  let config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify(body),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRestashop_URL_API}/rest/address`,
    config
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "HTTP error");
  }
  return data;
}

//update a specific address of the connected user
export async function updateUserAddress(id, cookie, body) {
    const requestOptions = {
        method: 'PUT',
        headers: {  
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': cookie
        },
        body: qs.stringify({...body, id})
    };
    
    return fetch(`${process.env.NEXT_PUBLIC_PRestashop_URL_API}/rest/address/setfields`,requestOptions)
    .then(response => response.json())
    .catch((error) => console.log("Error: ", error));
}
// export async function deletAdress(id, cookie){
//   const requestBody = {
//     method :'DELETE' ,
//     headers:{
//        'Content-Type':'application/json',
//        'Cookie':cookie
//     }
//   }
//   return await fetch(`${process.env.NEXT_PUBLIC_PRestashop_URL_API}/rest/address)
//   }
// }

export default async function handler(req, res) {
  const cookie = req.headers.cookie;
  const id_adresse = req.query.id_address;
    
  switch (req.method) {
    case 'GET':
      if (id_adresse) {
        const adresse = await getAdresse(cookie, id_adresse);
        if (adresse) {
          res.status(200).json(adresse);
        } else {
          res.status(404).json({ message: 'Adresse introuvable' });
        }
      } else {
        const userAddr = await getAllAdresse(cookie);
        if (userAddr) {
          res.status(200).json(userAddr);
        } else {
          res.status(401).json({ error: 'Utilisateur non authentifié' });
        }
      }
      break;
    case 'PUT':
      try {
        const data = req.body;
        const adressUpdated = await updateUserAddress(id_adresse, cookie, data);
        if (adressUpdated) {
          res.status(200).json(adressUpdated);
        } else {
          res.status(503).json({ error: "Impossible de mettre à jour l'adresse" });
        }
      } catch (error) {
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l adresse' });
      }
      break;
    case 'POST':
      try {
        const data = req.body;
        const newId = await addNewAddress(cookie, data);
        res.status(201).json({ id: newId });
      } catch (error) {
        res.status(503).json({ error: "Erreur lors de la création d'une nouvelle adresse" });
      }
      break;
    default:
      res.status(405).json({ message: 'Méthode non autorisée' });
      break;
  }
}


  
//   try {
//     const adress = req.query.id_address;
//     const response = await getAdresse(req.headers.cookie, adress);
//     if (response.code === 200) {
//       res.status(200).json(response);
//     } else {
//       console.log("Echec");
//       res.status(401).json({ error: "user non authentifié" });
//     }
//   } catch (error) {
//     // Gestion des erreurs
//     console.error("Une erreur s'est produite :", error);
//     res.status(500).json({ error: "Quelque chose s'est mal passé" });
//   }
// }

