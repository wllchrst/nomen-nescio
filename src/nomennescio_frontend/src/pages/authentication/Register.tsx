import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../../components/elements/fields/text-field";
import PasswordField from "../../components/elements/fields/password-field";
import Checkbox from "../../components/elements/checkboxes/checkbox";
import DrawableCanvas from "../../components/elements/canvas/drawable-canvas";
import TypingEffect from "react-typing-effect";
import useWords from "../../hooks/use-authentication-words";
import ParticleBackground from "../../components/elements/canvas/particle-background";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { IRegister } from "../../interfaces/register-interface";
// import { GeneralService } from "../../service/general-service";
// import { UserService } from "../../service/user-service";

const Register: React.FC = () => {
  const words = useWords();
  const navigate = useNavigate();
  // const { register, handleSubmit } = useForm<IRegister>();
  const [file, setFile] = useState<File | null>(null);
  // const generalService = new GeneralService();
  // const userService = new UserService();

  function changeFile(inputFile: File | null) {
    setFile(inputFile);
  }

  // const onSubmit: SubmitHandler<IRegister> = async (data) => {
  //   if (file == null) {
  //     alert("Please make sure that you have done your signature.");
  //     return;
  //   }

  //   const path = await generalService.uploadFile(file);
  //   console.log(`PATH: ${path}`);

  //   if (path == "") {
  //     console.log("something went wrong");
  //     return;
  //   }

  //   data.signature_file_path = path;
  //   const result = await userService.registerUser(data);

  //   if (result) console.log("SUCCESSFUL");
  // };

  return (
    <div className="relative flex justify-center items-center bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white">
      <ParticleBackground />

      <div className="relative max-w-5xl bg-[#1e293b] rounded-lg shadow-2xl overflow-hidden p-8 md:p-10 space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-2">

          Your&nbsp;
          <TypingEffect
            text={words}
            speed={100}
            eraseSpeed={50}
            typingDelay={500}
            cursor="|"
            eraseDelay={1000}
            displayTextRenderer={(text: string) => <span>{text}</span>}
          />
        </h2>
        <p className="text-base text-gray-400 mb-6">
          Create your account and join us.
        </p>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <TextField
                variant="username"
                title="Full Name*"
                className="w-full"
                // register={register("name")}
              />
              <TextField
                variant="email"
                title="Email*"
                className="w-full"
                // register={register("email")}
              />
              <PasswordField
                variant="password"
                title="Password*"
                className="w-full"
                // register={register("password")}
              />
              <Checkbox text="I agree to" link="Terms & Conditions" />
            </div>

            <div className="space-y-4">
              <DrawableCanvas
                setFile={changeFile}
                width={350}
                height={250}
                text="Draw Your Signature*"
              />
            </div>
          </div>

          <button className="w-full mt-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 transition duration-200 transform hover:scale-105">
            Register
          </button>
        {/* </form> */}

        <p className="mt-4 text-gray-400 text-center text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
