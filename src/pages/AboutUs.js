import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '@/components/PublicNavbar';
import { Wallet } from 'lucide-react';
import PublicFooter from '@/components/PublicFooter';


function AboutUs() {
  const navigate = useNavigate();

  return (
    <>
      {/* ✅ SAME NAVBAR AS LANDING PAGE */}
      <PublicNavbar />

      {/* Page Content */}
      <div className="pt-32 min-h-screen bg-void text-white px-6 md:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-['Outfit'] text-gold mb-6">
           1. About Iron Wallet Investment
          </h1>

          <p className="text-white/70 text-lg leading-relaxed mb-6">
           IronWallet Investments is a modern investment platform focused on delivering structured monthly income opportunities through strategic exposure to cryptocurrencies and global commodities. Built for today’s fast-evolving financial landscape, we combine innovation, discipline, and data-driven decision-making to help investors grow capital responsibly.

           Our investment approach is designed to balance growth and stability. By actively managing diversified portfolios across digital assets, blockchain-based opportunities, and selected commodities such as precious metals, we aim to reduce risk while capturing market potential. This hybrid strategy allows IronWallet Investments to perform across different market cycles, whether bullish or volatile.

           We offer investors clearly defined investment plans with the objective of generating monthly returns, making wealth creation more predictable and transparent. Every portfolio is guided by professional market analysis, risk controls, and capital allocation models rather than speculation or hype.

           At IronWallet Investments, trust and transparency are core values. Investors receive regular performance updates, clear reporting, and full visibility into their investment structure. Our team continuously monitors global market trends, liquidity conditions, and risk exposure to protect investor capital and optimize returns.

           While our strategies are designed for consistent performance, all investments involve market risk. Returns are not guaranteed, and past performance does not ensure future results. IronWallet Investments does not provide financial, legal, or tax advice, and investors are encouraged to evaluate their risk tolerance before participating.

           Our mission is simple yet powerful: to create sustainable income streams and long-term wealth through disciplined crypto and commodity investing. IronWallet Investments stands for strength, resilience, and forward-thinking financial growth—built for investors who value clarity, control, and performance.
          </p>

           <h2 className="text-4xl md:text-5xl font-bold font-['Outfit'] text-gold mb-6">
          2. Why Choose IronWallet Investments
          </h2>
         

         <p className="text-white/70 text-lg leading-relaxed mb-6">
         At IronWallet Investments, we understand that investing is personal. People don’t just invest money — they invest trust, time, and future plans. That’s why our focus goes beyond numbers and charts.

         We follow a balanced investment approach, combining the growth potential of cryptocurrencies with the relative stability of global commodities. This allows us to spread risk and adapt to changing market conditions rather than relying on a single asset class.

         Our investors value monthly performance tracking, which helps them stay informed and confident about where their money stands. While markets move daily, we structure our strategies to focus on consistency rather than short-term excitement.

         What truly sets us apart is our commitment to clarity and honesty. We communicate openly, share updates regularly, and make sure investors understand both opportunities and risks. Whether you are new to investing or have prior experience, our team is here to guide you with transparency and respect.
         </p>

          <h2 className="text-4xl md:text-5xl font-bold font-['Outfit'] text-gold mb-6">
          3. Frequently Asked Questions (FAQs)
          </h2>

           <h4 className="text-2xl md:text-3xl font-bold font-['Outfit'] text-gold mb-6">
              What kind of assets do you invest in?
               </h4>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
              We invest in a mix of cryptocurrencies, blockchain-driven opportunities, and selected commodities, including precious metals. This blend helps us manage volatility more effectively.
            </p>

            <h4 className="text-2xl md:text-3xl font-bold font-['Outfit'] text-gold mb-6">
              How do payouts work?
               </h4>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Performance is reviewed monthly, and profits—if generated—are distributed according to the selected investment plan.
                 </p>

                 <h4 className="text-2xl md:text-3xl font-bold font-['Outfit'] text-gold mb-6">
                    Is my investment safe?
               </h4>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                 Yes. We follow strict internal controls, diversified strategies, and disciplined risk management practices, which make our operational process 99.99% secure from our side. The remaining risk is purely market-driven, as crypto and commodity prices naturally fluctuate. While no market-based investment can be completely risk-free, we focus on minimizing avoidable risks and managing capital responsibly at all times.
                </p>

                <h2 className="text-4xl md:text-5xl font-bold font-['Outfit'] text-gold mb-6">
                 4. Risk Disclosure
                   </h2>
               <p className="text-white/70 text-lg leading-relaxed mb-6">
                    Investing in crypto and commodities involves market risk, price fluctuations, and potential loss of capital. Digital assets are particularly volatile and may be affected by regulatory or technological changes.

                    Monthly returns are targets, not guarantees. Past performance should not be considered a promise of future results. Investors should only invest funds they are comfortable allocating to market-based instruments.

                    IronWallet Investments does not offer personal financial, tax, or legal advice. Each investor is responsible for their own investment decisions.
            </p>

            <h2 className="text-4xl md:text-5xl font-bold font-['Outfit'] text-gold mb-6">
                 5. Terms & Conditions
            </h2>

             <p className="text-white/70 text-lg leading-relaxed mb-6">
              By using our platform and investing with IronWallet Investments, you agree to the following:
              </p>
	          <p className="text-white/70 text-lg leading-relaxed mb-6">• You understand that all investments involve risk.</p>
	          <p className="text-white/70 text-lg leading-relaxed mb-6">• Returns depend entirely on market performance.</p>
	          <p className="text-white/70 text-lg leading-relaxed mb-6">• Investment plans may include lock-in periods, fees, or withdrawal conditions, which are clearly shared before investing.</p>
	          <p className="text-white/70 text-lg leading-relaxed mb-6">• We reserve the right to update strategies or terms as market conditions change.</p>
	          <p className="text-white/70 text-lg leading-relaxed mb-6">• Any misuse of the platform may lead to account restrictions.</p>
             
           <h2 className="text-4xl md:text-5xl font-bold font-['Outfit'] text-gold mb-6">
              6. Investor Agreement
          </h2>

           <p className="text-white/70 text-lg leading-relaxed mb-6">
             By investing with IronWallet Investments, you confirm that you have reviewed and understood all disclosures and risks. You acknowledge that returns are not guaranteed and that capital is exposed to market movement.
            </p>

            <p className="text-white/70 text-lg leading-relaxed mb-6">
             IronWallet Investments operates as an investment platform and portfolio manager, not a bank or insured institution. All participation is voluntary, and investors are encouraged to stay informed and ask questions before committing funds.
            </p>

       </motion.div>
      </div>

      {/* ✅ SAME FOOTER AS LANDING & PRODUCTS */}
        <PublicFooter />

    </>
  );
}

export default AboutUs;
