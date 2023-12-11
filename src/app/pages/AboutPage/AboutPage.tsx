//@ts-nocheck
import { Breadcrumb } from 'antd';
import React from 'react';
import TeamComp from '../../components/Layout/Team/TeamComp';
import Mission from './Mission';
import About from './About';
import Team from '../../components/Layout/Team/Team';

const AboutPage = () => {
  return (
    <div className='pt-[100px]'>
      <div
        style={{
          backgroundImage: `url(https://www.usinformationsearch.com/wp-content/uploads/2016/05/custom-background-checks-you-can-trust1-5.jpg)`,
        }}
        className="h-[400px] flex justify-center pl-[60px] items-center flex-col rounded-[30px] mx-[35px]"
      >
        <h2 className="text-[55px]">About us</h2>
        <Breadcrumb
          items={[
            {
              title: 'Home',
              href: '/',
              className:"font-bold"
            },
            {
              title: 'About',
              href: '/AboutPage',
              className:"font-bold"
            },
          ]}
        />
      </div>
      <div className="container mx-auto px-4">
        <About />
        <Mission />
        <Team />
      </div>
    </div>
  );
};

export default AboutPage;
