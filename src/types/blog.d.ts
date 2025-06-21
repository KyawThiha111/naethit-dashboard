type BlogType = {
  id: string;
  titleen: string;
  descriptionen: string;
  image: string;
};

type BlogTypePayload = {
  titlemy: string;
  titleen: string;
  descriptionmy: string;
  descriptionen: string;
  catagory?: string;
  // tag?: string;
  // image?: string;
  blogen: string;
  blogmy: string;
  postdate: string;
  timelength: string;
};

type BlogPostRes = {
  id: string;
  titleen: string;
  titlemy: string;
  descriptionen: string;
  descriptionmy: string;
  blogen: string;
  blogmy: string;
  postdate: string;
  timelength: string;
  catagory: string;
  imageUrl?: string;
};
