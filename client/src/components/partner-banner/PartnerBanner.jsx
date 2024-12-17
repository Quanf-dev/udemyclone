import React from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import styles from "./PartnerBanner.module.css";

const PartnerBanner = () => {
  const partners = [
    {
      src: "https://cms-images.udemycdn.com/content/tqevknj7om/svg/volkswagen_logo.svg?position=c&quality=80&x.app=portals",
      alt: "Volkswagen logo gray and white logo",
    },
    {
      src: "https://cms-images.udemycdn.com/content/2gevcc0kxt/svg/samsung_logo.svg?position=c&quality=80&x.app=portals",
      alt: "Samsung logo gray and white logo",
    },
    {
      src: "https://cms-images.udemycdn.com/content/mueb2ve09x/svg/cisco_logo.svg?position=c&quality=80&x.app=portals",
      alt: "Cisco logo gray and white logo",
    },
    {
      src: "https://cms-images.udemycdn.com/content/ryaowrcjb2/svg/vimeo_logo_resized-2.svg?position=c&quality=80&x.app=portals",
      alt: "Vimeo logo gray and white logo",
    },
    {
      src: "https://cms-images.udemycdn.com/content/bthyo156te/svg/procter_gamble_logo.svg?position=c&quality=80&x.app=portals",
      alt: "Procter & Gamble logo gray and white logo",
    },
    {
      src: "https://cms-images.udemycdn.com/content/luqe0d6mx2/svg/hewlett_packard_enterprise_logo.svg?position=c&quality=80&x.app=portals",
      alt: "Hewlett Packard logo gray and white logo",
    },
    {
      src: "https://cms-images.udemycdn.com/content/siaewwmkch/svg/citi_logo.svg?position=c&quality=80&x.app=portals",
      alt: "Citi logo gray and white logo",
    },
    {
      src: "https://cms-images.udemycdn.com/content/swmv0okrlh/svg/ericsson_logo.svg?position=c&quality=80&x.app=portals",
      alt: "Ericsson logo gray and white logo",
    },
  ];

  return (
    <Container className={styles.partnerBanner}>
      <Typography variant="h4" className={styles.heading}>
        Trusted by over 16,000 companies and millions of learners around the
        world
      </Typography>
      <Box component="ul" className={styles.partnerLogosList}>
        {partners.map((partner, index) => (
          <Box component="li" key={index} className={styles.partnerLogoItem}>
            <img src={partner.src} alt={partner.alt} loading="lazy" />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default PartnerBanner;
