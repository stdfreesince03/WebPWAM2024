import '../../styles/Pricing.css'
import Faq from "../../components/Faq.jsx";
import {pricingFaqData} from "../../data/faqData.js";
import pricingFaqStyles from "../../styles/PricingFaq.module.scss"
import PricingCards from "../../components/PricingCards.jsx";
import {pricingData} from "../../data/pricingData.js";
import pricingCardsStyles from "../../styles/PricingCards_Pricing.module.css";

export default function Pricing(){
    return (
        <div className="container-pricing-page">
            <PricingCards data={pricingData} styles={pricingCardsStyles}></PricingCards>
            <Faq data={pricingFaqData} styles={pricingFaqStyles}></Faq>

        </div>
    );
}