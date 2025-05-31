export default function ErrorMessage({ children } : {children : React.ReactNode}) {
  return (
    <h2 className=" text-base font-semibold max-w-2/3 mx-auto uppercase bg-red-600 mb-10 rounded-md p-2 text-white">{children}</h2>
  )
}
