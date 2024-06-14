import React from 'react';
import headshot from '../../../static/assets/Headshot.jpg';

export default function() {
    return (
        <div className="aboutMePage">
            <div className="leftColumn" style={{backgroundImage: `url(${headshot})`}}>
                {/* <img src={headshot} /> */}
            </div>
            <div className="rightColumn">
                <div className="heading">
                    <h1>About Me</h1>
                </div>
                <div className="description">
                    <p>
                        <strong style={{color: '#64C6B9'}}>Aloha!</strong> My name is <strong style={{color: '#64C6B9'}}>Jennifer Gilson</strong>, and I am the founder and creative force behind <strong style={{color: '#64C6B9'}}>“Say It With A Lei,”</strong> a lei business dedicated to sharing the rich traditions of Hawaii with others.
                    </p>
                    <p>
                        While going to college in Hawaii, I was deeply inspired by the island’s natural beauty and cultural heritage. I learned from island locals how to make several kinds of authentic leis with ribbon. Leis have always held a special place in my heart: symbolizing love, celebration, and the warm embrace of Aloha. I started crafting leis as a hobby, a way to stay connected to my time in Hawaii and share the joy of Hawaiian traditions with others.
                    </p>
                    <p>
                        After graduating over 20 years ago, I still have my own graduation ribbon leis! With Say It With A Lei, each piece is meticulously handcrafted using high-quality materials, ensuring that every lei is not only a stunning accessory but also a cherished keepsake.
                    </p>
                        My journey from a passionate crafter to a business owner has been fueled by a desire to spread the Aloha spirit far and wide. Whether you’re celebrating a graduation, a wedding, or simply want to add a touch of Hawaii to your life, my leis are designed to bring joy and beauty to every occasion.
                    <p>
                        Let me help you say “Congratu-LEI-tions” that will last for years to come.
                    </p>
                    <p>
                        Mahalo for supporting my small business and for allowing me to share a piece of Hawaii with you. Let’s celebrate life’s special moments together, one lei at a time.
                    </p>
                    <p>    
                        Warmest Aloha, <br />
                        Jennifer Gilson
                    </p>
                </div>
            </div>
        </div>
    );
}