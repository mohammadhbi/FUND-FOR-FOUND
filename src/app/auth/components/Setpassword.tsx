import Image from "next/image"

function Setpassword() {
  return (
    <div>
      <Image src="https://res.cloudinary.com/dmngeplgl/image/upload/v1745064771/password_oljphs.png" alt="Set password"/>
      <p className="text-[var(--color-primary)] text-2xl"> Set your password</p>
      <div>
        <label htmlFor="">
            password
        </label>
        <input type="password" />
        <p>. At least 8 characters long but 12 or more is better</p>
        <p>. A combination of uppercase letters ,lowercase letters,numbers, and symbols</p>
      </div>
      <div>
        <label htmlFor="">
            Re enter password
        </label>
        <input type="password" />
      </div>
    </div>
  )
}

export default Setpassword
