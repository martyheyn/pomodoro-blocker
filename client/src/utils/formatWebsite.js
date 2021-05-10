export default function formatWebsite(website) {
  if (website !== '') {
    if (
      website.substring(0, 4) !== 'www.' &&
      website.slice(website.length - 4) !== '.com'
    ) {
      website = `www.${website}.com`;
    } else if (website.substring(0, 4) !== 'www.' || website.substring(0, 6) !== 'https:') {
      website = `www.${website}`;
    } else if (website.slice(website.length - 4) !== '.com') {
      website = `${website}.com`;
    } else {
      return website;
    }
  } else {
    return null;
  }

  return website;
};
