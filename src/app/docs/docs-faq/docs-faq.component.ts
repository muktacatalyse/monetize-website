import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-docs-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './docs-faq.component.html',
  styleUrl: './docs-faq.component.scss'
})
export class DocsFAQComponent {
  faqList = [
    {
      question: 'What is a survey-wall?',
      answerHtml: `<ul>
        <li>A user-initiated ad unit that acts like a mini store.</li>
        <li>Lists of surveys + offers that users can complete in exchange for in-app reward or country-specific giftcards (e.g., Amazon, PayPal, Google Pay).</li>
        <li>Users are rewarded and giftcards are redeemed by email instantly, with a minimum of $0.10.</li>
        <li>Users can also engage in coupons, free HTML5 games, and chat.</li>
        <li>Every offering can be customized or included/excluded by you.</li>
      </ul>`
    },
    {
      question: 'How it works',
      answerHtml: `<ul>
        <li>User accesses the survey wall via traffic drivers (CTA button, banners, icons).</li>
        <li>Chooses from surveys/offers, each with different rewards and durations.</li>
        <li>Fills the survey and has access to free games, coupons, chat, and offerwalls.</li>
        <li>Collects rewards as giftcards or IAP points as configured.</li>
      </ul>`
    },
    {
      question: 'Why should apps or websites integrate pocketsfull.ai survey-wall?',
      answerHtml: `<ul class="mb-0">
        <li>Experience rewarded ad monetization with user-initiated format.</li>
        <li>Multi-wall is a strong alternative to IAP:
          <ol>
            <li>Players get currency without spending money.</li>
            <li>Developers get additional revenue.</li>
          </ol>
        </li>
        <li>Users earn real-time giftcards, engaging in a rewards loop.</li>
        <li>Boosts LTV without hurting other app metrics.</li>
      </ul>`
    },
    {
      question: 'Effects of survey-wall on in-app purchases (for games)',
      answerHtml: `<ol class="mb-3">
        <li>Playing Players
          <ul>
            <li>Engage with surveys more often.</li>
            <li>Complete more rewarding surveys.</li>
            <li>Generate 1.5-2x more revenue per user.</li>
            <li>Continue making IAPs after using the survey-wall.</li>
          </ul>
        </li>
      </ol>
      <p>Survey-walls increase overall LTV without reducing IAP or rewarded video metrics.</p>`
    },
    {
      question: 'Survey-wall vs Offerwalls',
      answerHtml: `<p><strong>Survey-wall</strong></p>
      <ul class="mb-3">
        <li>Access first-party surveys with one click in 100+ countries.</li>
        <li>Easy one-click integration.</li>
        <li>Android and iOS compliant.</li>
        <li>Redemptions via giftcards, in-app currency, or both.</li>
      </ul>
      <p><strong>Traditional Offerwall</strong></p>
      <ul class="mb-3">
        <li>Fewer negotiable surveys.</li>
        <li>Android OK; many iOS offers blocked or unprofitable.</li>
        <li>Compliant with both platforms.</li>
        <li>Usually in-app currency only.</li>
      </ul>`
    },
    {
      question: 'What are key considerations for implementing survey wall?',
      answerHtml: `<ol>
        <li><strong>Placement:</strong> Visibility matters (e.g. home screen button). Direct placement can 2.2x engagement.</li>
        <li><strong>Traffic Drivers:</strong> Clear CTAs like “Free Gold” or “Earn giftcards”.</li>
        <li><strong>Rewards:</strong> Match IAP values (e.g. $1 = 100 gems) or localize giftcard currencies.</li>
      </ol>`
    },
    {
      question: 'Do you need a split currency (e.g., premium vs normal) to use the offer wall?',
      answerHtml: `<p>Not necessarily. You can reward the primary currency (e.g., “Gold”) via the offer wall using similar conversion rates as IAPs.</p>`
    },
    {
      question: 'What is the effect of the multi wall on retention?',
      answerHtml: `<p>Survey wall users usually have longer lifetimes. Players who earn and use rewards tend to return regularly.</p>`
    }
  ];
}
