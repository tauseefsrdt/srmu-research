import { GraduationCap, Globe, Target, Sparkles, CheckCircle2 } from 'lucide-react';

import AboutImage from './AbutImage';

function Aboutpage() {
  return (
    <>
    <div className="about-page home-width">

      {/* Hero Banner */}
      <div className="about-hero">
        <div className="announce-pill">
          <GraduationCap className="w-4 h-4" />
          <span>Shri Ramswaroop Memorial University</span>
        </div>
        <h1><em>Research &amp; Consultancy Cell</em></h1>
        <p>
          Dedicated to fostering groundbreaking research, innovation, and scholarly excellence across engineering, technology, sciences, humanities, and management.
        </p>
      </div>


      {/* Mission & Vision Cards */}
      <div className="about-grid">

           <div className="about-card blush-surface">
          <div className="about-icon navy">
            <Globe className="w-6 h-6" />
          </div>
          <h2>Vision</h2>
          <p>
            “To establish Shri Ramswaroop Memorial University, Barabanki as a centre of excellence in
            research, innovation and consultancy, fostering a vibrant research ecosystem that generates
            impactful knowledge, develops innovative solutions, strengthens industry–academia
            collaboration, and contributes meaningfully to sustainable societal and economic development.”
          </p>
        </div>






        <div className="about-card mint-surface">
          <div className="about-icon">
            <Target className="w-6 h-6" />
          </div>
          <h2>Mission</h2>
          <p>
            <h1 className='text-2xl font-bold text-gray-900'>
             1. Promote Research Excellence
            </h1>
            To cultivate a strong culture of high-quality, interdisciplinary and outcome-oriented
            research across all disciplines of the University.
            <h1 className='text-2xl font-bold text-gray-900'>
             2. Foster Innovation and Creativity
            </h1>
            To encourage faculty, researchers and students to undertake innovative research, develop
            new technologies, and translate ideas into impactful solutions.
          </p>
        </div>

     

      </div>

      {/* Key Highlights */}
      <div className="highlights-panel">
        <h3><Sparkles />
          <span>Research Excellence Highlights</span>
        </h3>

        <div className="highlight-grid">
          <div className="highlight-item">
            <CheckCircle2 />
            <div>
              <strong>Patents & Designs</strong>
              <span>Multiple Indian and International patents filed & published.</span>
            </div>
          </div>

          <div className="highlight-item">
            <CheckCircle2 />
            <div>
              <strong>Indexed Publications</strong>
              <span>Scopus, Web of Science, and UGC CARE recognized articles.</span>
            </div>
          </div>

          <div className="highlight-item">
            <CheckCircle2 />
            <div>
              <strong>Books & Monograph</strong>
              <span>Authored book chapters and textbooks published globally.</span>
            </div>
          </div>
        </div>
      </div>



     <div className="flex flex-col md:flex-row h-screen mt-5">
  
  <div className="flex w-full md:w-1/2 h-1/2 md:h-full ">
    <img
      src="Images/5.png"
      alt="Image 1"
      className="w-70 h-80 object-cover"
    />
  </div>

  
  <div className="flex mt-20 w-full md:w-1/2 h-1/2 md:h-full items-center justify-center bg-white">
    <div>
      
      <img
      src="Images/6.png"
      alt="Image 1"
      className="w-full h-80 object-cover"
    />
    </div>
  </div>
  
</div>

{/* <AboutImage/> */}






    </div>
     </>
  );
}

export default Aboutpage;
