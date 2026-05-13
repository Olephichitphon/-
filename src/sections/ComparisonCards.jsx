import React, { useState, useEffect } from 'react';
import { getFeaturedPlans, urlFor } from '../lib/sanity';
import Button from '../components/Button';

const ComparisonCards = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getFeaturedPlans();
        setPlans(data);
      } catch (err) {
        console.error('Failed to fetch plans:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (loading) return null;

  return (
    <section className="py-20 bg-white" id="plans">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">แผนประกันแนะนำ</h2>
          <p className="text-slate-500 max-w-xl mx-auto">แผนประกันยอดนิยมที่คุ้มค่าที่สุด คัดสรรมาเพื่อคุณโดยเฉพาะ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan._id} className="relative group p-8 rounded-3xl border border-slate-100 bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              {/* Company Logo & Name */}
              <div className="flex items-center gap-4 mb-6">
                {plan.logo ? (
                  <img src={urlFor(plan.logo).url()} alt={plan.companyName} className="w-12 h-12 object-contain" />
                ) : (
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center font-bold text-blue-600">
                    {plan.companyName.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-slate-900">{plan.companyName}</h3>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-bold">
                    ชั้น {plan.planType === '1' ? '1' : plan.planType.replace('plus', '+')}
                  </span>
                </div>
              </div>

              {/* Pricing & Coverage */}
              <div className="mb-6">
                <div className="text-sm text-slate-500 mb-1">เบี้ยประกันเริ่มต้น</div>
                <div className="text-3xl font-extrabold text-blue-600">
                  {plan.premium?.toLocaleString()} <span className="text-sm font-normal text-slate-400">บาท/ปี</span>
                </div>
              </div>

              <div className="py-4 border-y border-slate-50 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">ทุนประกันสูงสุด</span>
                  <span className="font-bold text-slate-900">{plan.coverage?.toLocaleString()} บาท</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {plan.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button variant="outline" className="w-full">ดูรายละเอียดเพิ่ม</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonCards;
