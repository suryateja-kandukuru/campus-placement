import React from "react";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import "./SignUp.scss";

const CollegeCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/college-signup"); // Replace '/college' with your college route
  };

  return (
    <Card
      title="College"
      style={{ width: "300px" }}
      onClick={handleClick}
      className="cursor-pointer card-singup"
    >
      {/* Add your college card content here */}
    </Card>
  );
};

const CompanyCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/company-signup"); // Replace '/company' with your company route
  };

  return (
    <Card
      title="Company"
      style={{ width: "300px" }}
      onClick={handleClick}
      className="cursor-pointer card-singup"
    >
      {/* Add your company card content here */}
    </Card>
  );
};

export function SignUp() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full max-w-md flex gap-5">
        <CollegeCard />
        <CompanyCard />
      </div>
    </div>
  );
}

export default SignUp;
