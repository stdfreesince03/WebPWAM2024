import '../../styles/Pricing.css'
import Faq from "../../components/Faq.jsx";
import {pricingFaqData} from "../../data/faqData.js";
import pricingFaqStyles from "../../styles/PricingFaq.module.scss"

export default function Pricing(){
    return (
        <div className="container-pricing-page">
            <div className="pricing-header">
                <h1>Our Pricings</h1>
                <p>Welcome to SkillBridge&#39;s Pricing Plan page, where we offer two comprehensive options to cater to your
                    needs: Free and Pro. Explore our pricing options below and choose the one that best fits your
                    requirements.</p>
            </div>

            <div className="toggle-buttons">
                <button className="toggle-btn active">Monthly</button>
                <button className="toggle-btn">Yearly</button>
            </div>

            <div className="pricing-cards">
                <div className="pricing-card">
                    <div className="plan-header">Free Plan</div>
                    <div className="plan-price">$0<span>/month</span></div>
                    <div className="features">
                        <div className="feature">✓ Access to selected free courses.</div>
                        <div className="feature">✓ Limited course materials and resources.</div>
                        <div className="feature">✓ Basic community support.</div>
                        <div className="feature">✓ No certification upon completion.</div>
                        <div className="feature">✓ Ad-supported platform.</div>
                        <div className="feature">✗ Access to exclusive Pro Plan community forums.</div>
                        <div className="feature">✗ Early access to new courses and updates.</div>
                    </div>
                    <button className="get-started">Get Started</button>
                </div>

                <div className="pricing-card">
                    <div className="plan-header">Pro Plan</div>
                    <div className="plan-price">$79<span>/month</span></div>
                    <div className="features">
                        <div className="feature">✓ Unlimited access to all courses.</div>
                        <div className="feature">✓ Unlimited course materials and resources.</div>
                        <div className="feature">✓ Priority support from instructors.</div>
                        <div className="feature">✓ Course completion certificates.</div>
                        <div className="feature">✓ Ad-free experience.</div>
                        <div className="feature">✓ Access to exclusive Pro Plan community forums.</div>
                        <div className="feature">✓ Early access to new courses and updates.</div>
                    </div>
                    <button className="get-started">Get Started</button>
                </div>
            </div>
            {/*<div className="faq-section">*/}
            {/*    <div className="faq-header">*/}
            {/*        <h2>Frequently Asked Questions</h2>*/}
            {/*        <p>Still have any questions? Contact our Team via support@skillbridge.com</p>*/}
            {/*        <button className="see-all-faqs">See All FAQ&#39;s</button>*/}
            {/*    </div>*/}

            {/*    <div className="faq-questions">*/}
            {/*        <div className="faq-item">*/}
            {/*            <div className="faq-question">*/}
            {/*                <span>Can I enroll in multiple courses at once?</span>*/}
            {/*                <button className="faq-toggle">+</button>*/}
            {/*            </div>*/}
            {/*            <div className="faq-answer">*/}
            {/*                <p>Absolutely! You can enroll in multiple courses simultaneously and access them at your*/}
            {/*                    convenience.</p>*/}
            {/*                <div className="enroll-process">*/}
            {/*                    <span>Enrollment Process for Different Courses</span>*/}
            {/*                    <button className="arrow-btn">→</button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="faq-item">*/}
            {/*            <div className="faq-question">*/}
            {/*                <span>What kind of support can I expect from instructors?</span>*/}
            {/*                <button className="faq-toggle">+</button>*/}
            {/*            </div>*/}
            {/*            <div className="faq-answer">*/}
            {/*                <p>You can expect regular feedback, Q&A sessions, and guidance through assignments and*/}
            {/*                    projects.</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="faq-item">*/}
            {/*            <div className="faq-question">*/}
            {/*                <span>Are the courses self-paced or do they have specific start and end dates?</span>*/}
            {/*                <button className="faq-toggle">+</button>*/}
            {/*            </div>*/}
            {/*            <div className="faq-answer">*/}
            {/*                <p>Most courses are self-paced, allowing you to learn at your own speed. Some have set start*/}
            {/*                    and end dates for cohort-based learning.</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="faq-item">*/}
            {/*            <div className="faq-question">*/}
            {/*                <span>Are there any prerequisites for the courses?</span>*/}
            {/*                <button className="faq-toggle">+</button>*/}
            {/*            </div>*/}
            {/*            <div className="faq-answer">*/}
            {/*                <p>Some advanced courses may require basic knowledge in related topics. Prerequisites, if*/}
            {/*                    any, will be listed in the course description.</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="faq-item">*/}
            {/*            <div className="faq-question">*/}
            {/*                <span>Can I download the course materials for offline access?</span>*/}
            {/*                <button className="faq-toggle">+</button>*/}
            {/*            </div>*/}
            {/*            <div className="faq-answer">*/}
            {/*                <p>Yes, many course materials can be downloaded for offline use. This includes PDFs, videos,*/}
            {/*                    and resources provided during the course.</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*</div>*/}
            <Faq data={pricingFaqData} styles={pricingFaqStyles}></Faq>

        </div>
    );
}