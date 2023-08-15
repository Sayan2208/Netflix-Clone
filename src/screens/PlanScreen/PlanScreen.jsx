import React, { useEffect, useState } from "react";
import "./PlanScreen.css";
import db from "../../firebase";
import {
    addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function PlanScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription]=useState(null);

    useEffect(()=>{
        const colRef=collection(db, `customers/${user.uid}/subscriptions`);
        onSnapshot(colRef, (snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                setSubscription({
                    role: doc.data().role,
                    current_period_end: doc.data().current_period_end.seconds,
                    current_period_start: doc.data().current_period_start.seconds,
                })
            })
        })
    },[user.uid])

  useEffect(() => {
    const colRef = collection(db, "products");
    const q = query(colRef, where("active", "==", true));
    getDocs(q).then(function (snapshot) {
      const products = {};
      snapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products);
    });
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await addDoc(collection(db, `customers/${user.uid}/checkout_sessions`), {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

onSnapshot(docRef, (snap) => {
  const { error, url } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        window.location.assign(url);
      }
})
  };
  return (
    
    <div className="planScreen">
    <br />
        {subscription && (
            <p>Renewal Date: {new Date(subscription?.current_period_end*1000).toLocaleDateString()}</p>
        )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);

        return (
          <div key={productId} className={`planScreen__plan ${isCurrentPackage && "planScreen__plan--disabled"}`}>
            <div className="planScreen__info">
              <h4>{productData.name}</h4>
              <h5>{productData.description}</h5>
            </div>
            <button onClick={()=>
            (!isCurrentPackage) && loadCheckout(productData.prices.priceId)}>
              {
                isCurrentPackage? "Current Plan" : "Subscribe"
              }
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlanScreen;
