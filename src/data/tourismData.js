export const stats = {
  totalVisitors: 25203065,
  totalRevenue: 272961005111,
  avgStay: 6.5,
  avgSpend: 10746,
  totalRecords: 10000,
};

export const visitorsByMonth = [
  { month: 'Jan', visitors: 2279337, revenue: 25259396301 },
  { month: 'Feb', visitors: 2019003, revenue: 22292950161 },
  { month: 'Mar', visitors: 2071086, revenue: 22189887933 },
  { month: 'Apr', visitors: 2158342, revenue: 23408137772 },
  { month: 'May', visitors: 2184931, revenue: 22397862130 },
  { month: 'Jun', visitors: 2077159, revenue: 21938364540 },
  { month: 'Jul', visitors: 2172530, revenue: 24315862764 },
  { month: 'Aug', visitors: 2170527, revenue: 23894920109 },
  { month: 'Sep', visitors: 1974302, revenue: 20960873780 },
  { month: 'Oct', visitors: 2026485, revenue: 22497071994 },
  { month: 'Nov', visitors: 2027097, revenue: 22248571431 },
  { month: 'Dec', visitors: 2042266, revenue: 21557106196 },
];

export const visitorsByLocation = [
  { location: 'Darjeeling', visitors: 950570, revenue: 10180494111 },
  { location: 'Pushkar', visitors: 928428, revenue: 9717743141 },
  { location: 'Pune', visitors: 909099, revenue: 9729652614 },
  { location: 'Goa', visitors: 898932, revenue: 9791646329 },
  { location: 'Jaipur', visitors: 895405, revenue: 9527174846 },
  { location: 'Varanasi', visitors: 884276, revenue: 9420586929 },
  { location: 'Kanyakumari', visitors: 883161, revenue: 9584651850 },
  { location: 'Kerala', visitors: 877209, revenue: 9312018446 },
  { location: 'Alleppey', visitors: 863115, revenue: 0 },
  { location: 'Coorg', visitors: 861028, revenue: 9252581205 },
];

export const bySeason = [
  { season: 'Monsoon', visitors: 8394518, color: '#4ade80' },
  { season: 'Summer', visitors: 6414359, color: '#fb923c' },
  { season: 'Winter', visitors: 6340606, color: '#60a5fa' },
  { season: 'Autumn', visitors: 4053582, color: '#f59e0b' },
];

export const byPurpose = [
  { purpose: 'Family Trip', visitors: 5160418 },
  { purpose: 'Religious', visitors: 5146143 },
  { purpose: 'Leisure', visitors: 5073823 },
  { purpose: 'Adventure', visitors: 4926917 },
  { purpose: 'Business', visitors: 4895764 },
];

export const byTransport = [
  { mode: 'Train', visitors: 6484954 },
  { mode: 'Car', visitors: 6334166 },
  { mode: 'Flight', visitors: 6225697 },
  { mode: 'Bus', visitors: 6158248 },
];

export const byAccommodation = [
  { type: 'Hostel', visitors: 6593465 },
  { type: 'Hotel', visitors: 6316785 },
  { type: 'Homestay', visitors: 6221236 },
  { type: 'Resort', visitors: 6071579 },
];

export const byAgeGroup = [
  { age: '50+', visitors: 6447230 },
  { age: '36-50', visitors: 6401549 },
  { age: '26-35', visitors: 6187794 },
  { age: '18-25', visitors: 6166492 },
];

export const byCountry = [
  { country: 'Australia', visitors: 3274403 },
  { country: 'Canada', visitors: 3207437 },
  { country: 'UK', visitors: 3206510 },
  { country: 'Japan', visitors: 3146717 },
  { country: 'USA', visitors: 3129118 },
  { country: 'India', visitors: 3120280 },
  { country: 'France', visitors: 3094130 },
  { country: 'Germany', visitors: 3024470 },
];

export const visitorType = [
  { type: 'Domestic', value: 12837054 },
  { type: 'International', value: 12366011 },
];

export const destinations = [
  { name: 'Goa', desc: 'Beach paradise', emoji: '🏖️', lat: 15.29, lng: 74.12, tag: 'Coastal' },
  { name: 'Jaipur', desc: 'Pink City royalty', emoji: '🏰', lat: 26.91, lng: 75.78, tag: 'Heritage' },
  { name: 'Darjeeling', desc: 'Tea & mountains', emoji: '🏔️', lat: 27.04, lng: 88.26, tag: 'Hill Station' },
  { name: 'Varanasi', desc: 'Spiritual capital', emoji: '🕉️', lat: 25.32, lng: 83.0, tag: 'Religious' },
  { name: 'Kerala', desc: 'God\'s own country', emoji: '🌴', lat: 10.85, lng: 76.27, tag: 'Nature' },
  { name: 'Ladakh', desc: 'Land of high passes', emoji: '❄️', lat: 34.15, lng: 77.57, tag: 'Adventure' },
];
