
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const smStream = new SitemapStream({ hostname: 'https://www.nearnet.ca/' });

const writeStream = createWriteStream('./sitemap.xml');
smStream.pipe(writeStream);

// Example URLs (you should replace these with your actual routes)
smStream.write({ url: '/home/', changefreq: 'daily', priority: 0.9 });
smStream.write({ url: '/accounting_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/afterschool_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/basketball_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/boardgames_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/brushing_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/busishare_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/carinsurance_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/carmaintenance_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/carpool_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/carrychina_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/chartercar_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/chinafood_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/cleaning_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/cleanned_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/club_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/conditioner_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/cosmet_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/delivery_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/design_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/doors_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/drivecoach_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/eastasia_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/elemaint_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/equipmaint_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/fastfood_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/garden_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/glasses_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/homestayfamily_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/hotel_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/huoguo_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/hydropower_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/immigr_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/insurance_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/japfood_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/kitchen_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/lawconsu_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/loan_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/movie_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/needjob_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/notarization_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/openkey_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/othercultfood_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/parttime_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/pet_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/pingp_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/planeticket_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/recruit_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/renoneed_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/renovation_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/security_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/selfservice_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/shops_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/tableball_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/tele_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/ticket_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/trainadult_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/trainart_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/usedcar_list/', changefreq: 'daily', priority: 0.7 });
smStream.write({ url: '/westfood_list/', changefreq: 'daily', priority: 0.7 });

// ... Add more URLs as needed

smStream.end();

streamToPromise(smStream)
  .then(() => console.log('Sitemap generated successfully!'))
  .catch((err) => console.error('Error generating sitemap:', err));