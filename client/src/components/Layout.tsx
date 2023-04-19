import React from 'react'

type ILayoutProps = {
  children: React.ReactNode;
}

const Layout = (props: ILayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen gap-8 bg-gray-600'>
      {props.children}
    </div>
  )
}

export default Layout