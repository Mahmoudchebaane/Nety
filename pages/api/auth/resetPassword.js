export async function ResetPassword(cookie, data){
    const URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL_API;
    const response = await fetch(`${URL}/rest/resetpassword`,{
        method : "POST",
        headers:{
            'Content-Type':'application/json',
            'Cookie': cookie
        },
        body : JSON.stringify(data)
    });
    const responseData = await response.json();
    

    if (response.ok) {
      return responseData;
    } else {
      console.log("Failed to reset password :", responseData.error);
      return null;
    }
}

export default async function handler(req,res){
    try{
        const data = req.body;
        const cookie = req.headers.cookie;
        const response = await ResetPassword(cookie, data);
        if(response){
            res.status(200).json(response);
        } else {
            throw new error('Failed to reset password');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
}