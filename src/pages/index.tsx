import { GetServerSideProps } from "next";

import Head from "next/head";

import SubscribeButton from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "../styles/pages/stylesHome.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

// Possibilidades | chamada à api: cliente-side, server-side, static-site generation

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <div className={styles.bodyContainer}>
        <div className={styles.bodyContent}>
          <h5>👏 Hey, welcome</h5>
          <h1>
            News about <br />
            the <span>React</span> world
          </h1>
          <h4>
            Get acess to all the publications <br />{" "}
            <span>for {product.amount} month</span>
          </h4>
          <SubscribeButton priceId={product.priceId} />
        </div>
        <div className={styles.imageBanner}>
          <img src="/images/Mulher.svg" alt="Ilustração" />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve("price_1M42g8L262T2IqnSm3weAga4", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
  };
};
