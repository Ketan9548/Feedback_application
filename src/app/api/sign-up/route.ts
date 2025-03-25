import DBconnection from "@/lib/Dbconnection";
import UserModel from "@/model/User.Model";
import bcrypt from "bcryptjs";
import { sendValrificationEmail } from "@/helper/sendemailverification";

export async function POST(req: Request) {
  await DBconnection();
  try {
    const { email, password, username } = await req.json();
    const existinguserVerifybyUser = await UserModel.findOne({
      username,
      isverified: true,
    });

    if (existinguserVerifybyUser) {
      return Response.json(
        { success: false, message: "Username already exist" },
        { status: 400 }
      );
    }

    const existinguserbyemail = await UserModel.findOne({ email });
    const verifycode = Math.floor(100000 + Math.random() * 9000000).toString();

    if (existinguserbyemail) {
      if (existinguserbyemail.isverified) {
        return Response.json(
          {
            success: false,
            message: "Username already exists.",
          },
          { status: 400 }
        );
      } else {
        const hashpassword = await bcrypt.hash(password, 10);
        existinguserbyemail.password = hashpassword;
        existinguserbyemail.verifycode = verifycode;
        existinguserbyemail.VerifycodeExpiry = new Date(Date.now() + 3600000);
        await existinguserbyemail.save();
      }
    } else {
      const hashpassword = await bcrypt.hash(password, 10);
      const expiredate = new Date();
      expiredate.setHours(expiredate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashpassword,
        verifycode: verifycode,
        VerifycodeExpiry: expiredate,
        isverified: false,
        isAcceptingMessage: true,
        message: [],
      });

      await newUser.save();
    }

    // send Verification email
    const emailResponse = await sendValrificationEmail(
      email,
      username,
      verifycode
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message:
          "User registered successfully. Please verify your email address",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user: ", error);
    return Response.json({
      success: false,
      message: "Invalid request body",
    });
  }
}
