export default async function Register(req, res){
    const { email, password, firstName, lastName, phone } = req.body;

    const URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL_API;
    
    try {
        const response = await fetch(`${URL}/rest/register`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, firstName, lastName, phone })
        });
        console.log("ici profil data :"+response)

        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            throw new Error('Failed to register');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
