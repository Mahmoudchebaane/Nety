export async function confirmationOrder(cookie,items){
    const URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL_API;
    //console.log(`${URL}/rest/confirmorder`)
    console.log("body",items)
    const response = await fetch(`${URL}/rest/confirmorder`,{
        method: "POST",
        headers: {
            Accept:"application/json",
            'Content-Type': 'application/json',
            Cookie:cookie,
        },
        body: JSON.stringify(items),
    });
    console.log("confirm order",response)
    return response;
}

export default async function handler(req,res){
    try{
        const cookie = req.headers.cookie;
        const items = req.body;
        const response = await confirmationOrder(cookie,items);
        const data = await response.json();
console.log("response confirmation",response)
        if(response.ok){
            res.status(200).json(data);
        }else{
            res.status(400).json(data);
        }
    } catch(error){
        console.log("Erreur lors de la confirmation", error);
        res.status(500).json({message:"Erreur interne du serveur"});
    }
}