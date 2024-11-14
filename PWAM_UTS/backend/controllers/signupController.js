import db from '../config/db'
import bcrypt from 'bcrypt'

export async function signUp(req,res){

    try{
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;

        const {data:user,error : fetchErr} = await db
            .from(role)
            .select('*')
            .eq('email',email);

        if(user.length > 0 ){
            return res.status(409).json({error:'Email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const {error} = await db
            .from(role)
            .insert({email:email,password:hashedPassword});

        if(error){
            return res.status(400).json({error:'Signup Error'});
        }

        return res.json({message:'Signup Successful',user:{email:email}});

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }

}