import React from "react";

const Faq: React.FC = () => {
    return (
        <div className="w-full px-4 max-w-4xl mb-20 mx-auto">
            <h1 className="text-5xl font-bold mt-40 mb-10 text-white text-center">Questions</h1>
            <h3 className="text-center text-2xl font-semibold text-gray-300 mt-10 mb-20">
                Still have questions? Email us at korrapatigautham@gmail.com
            </h3>
            
            {/* FAQ Items */}
            <div className="space-y-4">
                {/* Question 1 */}
                <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-gray-800/50 backdrop-blur-sm">
                    <div className="collapse-title text-xl font-medium text-white">
                        Is this free?
                    </div>
                    <div className="collapse-content text-gray-300">
                        <p>
                            It is completely free for everyone! You can access our products by going to a server 
                            we are affiliated with or email our team at the designated email above for more information. 
                            We have no paid services and pride ourselves in bringing this type of education and 
                            service to everyone.
                        </p>
                    </div>
                </div>

                {/* Question 2 */}
                <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-gray-800/50 backdrop-blur-sm">
                    <div className="collapse-title text-xl font-medium text-white">
                        How do I use this?
                    </div>
                    <div className="collapse-content text-gray-300">
                        <p>
                            By going to a designated server of ours, you are almost immediately using our products 
                            as that is where all the magic happens. If you want this to be installed in your own server, 
                            use the link above and email me at the email above in order for me to help setup the 
                            discord bot in your server.
                        </p>
                    </div>
                </div>

                {/* Question 3 */}
                <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-gray-800/50 backdrop-blur-sm">
                    <div className="collapse-title text-xl font-medium text-white">
                        Why don't I see everything?
                    </div>
                    <div className="collapse-content text-gray-300">
                        <p>
                            We are still designing our products and in the beta version, more information will be 
                            released soon and will come out in a couple days. If there are any bugs you wish to report, 
                            email me at the email above.
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
        </div>
    );
}

export default Faq;
