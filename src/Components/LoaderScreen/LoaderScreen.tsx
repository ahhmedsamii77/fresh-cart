import { Triangle } from 'react-loader-spinner'
export default function LoaderScreen() {
  return (
    <div className='w-full h-screen flex items-center z-50 bg-white dark:bg-[#111827]  justify-center fixed'>
      <Triangle
        visible={true}
        height="80"
        width="80"
        ariaLabel="triangle-loading"
        color={localStorage.getItem('mode') ? '#0ea5e9' : '#0369a1'}
        wrapperStyle={{}}
      />
    </div>
  )
}
