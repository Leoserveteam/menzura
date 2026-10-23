// Content mirrors the Copy deck page in Figma (fpm3gDDOUwOaMu07QbTH3b). Edit copy there first.
export type Benefit = { text: string; principal: boolean };
export type Category = { key: string; name: string; promise: string; scene: string; items: Benefit[] };
export const categories: Category[] = [
  {
    "name": "The circle",
    "promise": "A house of five hundred men.",
    "scene": "Twelve at the table on a Thursday evening. One of them is there because a member invited him.",
    "items": [
      {
        "text": "Membership of the house, limited to 500",
        "principal": false
      },
      {
        "text": "Private dinners each quarter, with one guest of your choosing, and an evening each December",
        "principal": false
      },
      {
        "text": "Considered introductions to members you should know, with the consent of both",
        "principal": false
      },
      {
        "text": "Host under the house. Invite your own guests to a private dinner the house arranges for you",
        "principal": false
      },
      {
        "text": "Numbered invitations to give each year: two, or four for Principals",
        "principal": false
      },
      {
        "text": "Your numbered card. Tap it to your phone to open your record and reach the house",
        "principal": false
      }
    ],
    "key": "circle"
  },
  {
    "name": "The wardrobe",
    "promise": "Dressed for the year ahead, one piece at a time.",
    "scene": "The jacket for the Paris dinner was proposed in March, approved from an airport lounge, and waiting at home when he landed.",
    "items": [
      {
        "text": "A piece made to your measure every month, from four collections a year, in premium cloth chosen by the house",
        "principal": false
      },
      {
        "text": "A fitting when you join, so every piece fits from the first",
        "principal": false
      },
      {
        "text": "Approve, swap or hold each month’s piece",
        "principal": false
      },
      {
        "text": "Your own account for further pieces at the house’s prices",
        "principal": false
      },
      {
        "text": "Pieces delivered by hand, wherever the house can reach you",
        "principal": true
      },
      {
        "text": "Three further commissions a year, for occasions you choose",
        "principal": true
      },
      {
        "text": "First access to limited cloth",
        "principal": true
      }
    ],
    "key": "wardrobe"
  },
  {
    "name": "The attention",
    "promise": "Known, without having to explain yourself.",
    "scene": "His stylist knew about the announcement before most of his board. The portraits were already booked.",
    "items": [
      {
        "text": "A personal stylist who plans around your calendar",
        "principal": false
      },
      {
        "text": "Your private record, more exact with every piece",
        "principal": false
      },
      {
        "text": "The house remembers. Your milestones are marked, quietly",
        "principal": false
      },
      {
        "text": "Your assistant, welcome. Name the person who manages your calendar, and your stylist will work with them",
        "principal": false
      },
      {
        "text": "A portrait session every month, wherever you are. Your stylist directs it and books the photographer, and each month’s session is yours that month",
        "principal": false
      },
      {
        "text": "Extended portrait sessions on location, with grooming",
        "principal": true
      },
      {
        "text": "A dedicated stylist who replies within hours, seven days a week",
        "principal": true
      },
      {
        "text": "A commissioned piece for life’s major moments",
        "principal": true
      },
      {
        "text": "Priority in the workshop for events and travel",
        "principal": true
      }
    ],
    "key": "attention"
  },
  {
    "name": "The assurance",
    "promise": "Nothing left to chance.",
    "scene": "The night before his daughter’s wedding, a second agbada was pressed and waiting. He never needed it.",
    "items": [
      {
        "text": "If a piece does not fit as it should, we alter or remake it",
        "principal": false
      },
      {
        "text": "Shipping and duties shown before you approve, so nothing is due at your door",
        "principal": false
      },
      {
        "text": "Our privacy promise: photographs deleted after measurement, nothing shared or sold",
        "principal": false
      },
      {
        "text": "Your place is held. Pause for up to three months a year, and your membership is extended to match",
        "principal": false
      },
      {
        "text": "The occasion guarantee. Name your most important days, and the house confirms the fit, holds a second piece ready and arranges pressing on the day",
        "principal": false
      },
      {
        "text": "If anything ever disappoints, the house calls you personally within a day",
        "principal": false
      },
      {
        "text": "Care for every Menzura piece, for as long as you are a member: pressing, repairs and alterations",
        "principal": true
      },
      {
        "text": "The house on call: an urgent replacement or repair before an important moment, wherever you are",
        "principal": true
      }
    ],
    "key": "assurance"
  },
  {
    "name": "Access",
    "promise": "Recognised, wherever you are.",
    "scene": "At a hotel he’d never stayed in, the room was ready and nobody needed to ask his name.",
    "items": [
      {
        "text": "Privileges at partner hotels and invitation-only restaurants, shared with members only",
        "principal": false
      },
      {
        "text": "Stays and tables arranged by your stylist",
        "principal": false
      },
      {
        "text": "Priority reservations at partner restaurants",
        "principal": true
      }
    ],
    "key": "access"
  }
];

export const questions = [
  {
    "group": "Membership",
    "items": [
      {
        "q": "How do invitations work?",
        "a": "Membership is always by invitation. Each member may invite a small number of men a year, and anyone may apply to be considered. The house reviews every application personally, and either extends an invitation or declines with thanks."
      },
      {
        "q": "Can I pause my membership?",
        "a": "Yes, for up to three months a year. Your place is held and your membership is extended to match, so you lose nothing."
      },
      {
        "q": "Can I bring a guest to a member evening?",
        "a": "Each member may bring one guest to a quarterly dinner. Many members choose someone they intend to invite."
      },
      {
        "q": "Can I host my own guests?",
        "a": "Yes. Tell your stylist the date, the city and who you’d like to invite, and the house arranges a private dinner at one of its partner restaurants. You cover the dinner; the house handles everything else."
      },
      {
        "q": "Where can I use my privileges?",
        "a": "At the hotels and private restaurants the house partners with. The list is shared with members only. Ask your stylist and the house arranges your stay or table on your behalf."
      }
    ]
  },
  {
    "group": "Your wardrobe",
    "items": [
      {
        "q": "What if it doesn’t fit?",
        "a": "We alter or remake it. Your stylist checks in a week after delivery to make sure it wears as it should."
      },
      {
        "q": "How long does a garment take?",
        "a": "Three to four weeks from your approval to delivery. Shorter timelines can be arranged for an occasion."
      },
      {
        "q": "Can I skip or hold a month?",
        "a": "Yes. Tell your stylist and that month’s piece is held. Held pieces carry into the next collection, so nothing you’ve paid for is lost."
      },
      {
        "q": "How does the scan work?",
        "a": "You receive a private link. Wearing fitted clothing, you take two photographs with your phone, guided by voice. It takes under three minutes, and your stylist can guide you through it by video."
      },
      {
        "q": "How do the portrait sessions work?",
        "a": "Each month, your stylist plans a short session with a photographer near you, styled in your Menzura pieces. You receive ten finished portraits for your profiles, company pages and press, with the right to use them. Sessions don’t carry over, so each month’s is yours that month. The house never publishes your portraits without your written consent."
      }
    ]
  },
  {
    "group": "Privacy and practicalities",
    "items": [
      {
        "q": "What happens to my photographs?",
        "a": "They are used only to produce your measurements. Your measurements are kept in your private record and never shared outside the house."
      },
      {
        "q": "What about shipping and duties?",
        "a": "Both are shown and paid when you approve an order, so nothing is due at your door."
      },
      {
        "q": "Can my assistant manage this for me?",
        "a": "Yes. Name your assistant or chief of staff when you join, and your stylist will share proposals and your calendar with them. They can approve pieces on your behalf."
      }
    ]
  }
];
