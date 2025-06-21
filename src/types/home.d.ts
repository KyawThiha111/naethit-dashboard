type HomeBannerInfoType = {
  header_en: string;
  header_my: string;
  description_en: string;
  description_my: string;
  homepageblog_title_en: string;
  homepageblog_title_my: string;
  homepageblog_subtitle_en: string;
  homepageblog_subtitle_my: string;
  homepageblog_my: string;
  homepageblog_en: string;
  yos_en: string;
  yos_my: string;
  nop_en: string;
  nop_my: string;
  nom_en: string;
  nom_my: string;
  tps_en: string;
  tps_my: string;
  bannerimgFile:FileList;
  blogimgFile:FileList
};

type HomeBannerInfoResType = {
  success: boolean;
  data: HomeBannerInfoResType;
};

type TestimonialType = {
  note_en: string;
  note_my: string;
  patient_name_en: string;
  patient_name_my: string;
  patient_type_en: string;
  patient_type_my: string;
  _id: string;
};

type FacilitieType = {
  _id: string;
  clinicname_en: string;
  clinicname_my: string;
  openinghr_en: string;
  openinghr_my: string;
  address_en:string;
  address_my:string;
  mapurl: string;
  photo: string;
};

type CountDatasType = {
  success: boolean;
  formattedCountData: {
    services: {
      title: string;
      count: number;
    };
    members: {
      title: string;
      count: number;
    };
    usermessageCount: {
      title: string;
      count: number;
    };
    clinicCount: {
      title: string;
      count: number;
    };
    testimonalsCount: {
      title: string;
      count: number;
    };
    blogsCount: {
      title: string;
      count: number;
    };
  };
};
