import React from 'react'

type ILayoutProps = {
  children: React.ReactNode;
}

/**
 * Layout, který se používá na všech stránkách
 * @param props ILayoutProps
 * @returns JSX.Element
 */
const Layout = (props: ILayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen gap-8 bg-gray-600'>
      {props.children}
    </div>
  )
}

export default Layout