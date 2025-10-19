import { useState } from 'react';
import FAQItem from '@/pages/SettingsFAQ/components/FAQItem';
import { faqs } from '@/constants/faqs';

const SettingsFAQContent = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="p-4">
      <div className="space-y-2">
        {faqs.map((faq) => (
          <FAQItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            isOpen={openId === faq.id}
            onToggle={() => handleToggle(faq.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingsFAQContent;

