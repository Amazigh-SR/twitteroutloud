import { Tweet } from 'react-twitter-widgets'
import {useEffect, useState} from 'react';
import axios from 'axios';


export default function TweetList(props){
  const [tweets, setTweets] = useState([])
  
  useEffect(() =>{
    axios.get(`${process.env.REACT_APP_BACK_END_HOST}/tweets`, {withCredentials: true, headers: {"Access-Control-Allow-Origin": process.env.REACT_APP_FRONT_END_HOST}})
        .then(tweets => {
          setTweets(tweets.data)
          console.log(tweets.data)
        })
        .catch(err => console.error(err))
  }, [])
  
  const mockData = [
    {
        "created_at": "Sat Apr 10 19:53:17 +0000 2021",
        "id": 1380972170336211000,
        "id_str": "1380972170336210948",
        "full_text": "What if you could get all the information from Twitter without looking at a screen? \n\nAnybody interested in a Twitter client that reads tweets and threads to you, so that you can live hands-free?",
        "truncated": false,
        "display_text_range": [
            0,
            195
        ],
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": []
        },
        "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 1350939104444371000,
            "id_str": "1350939104444370945",
            "name": "Dan Pappo",
            "screen_name": "danpappo",
            "location": "",
            "description": "Building software for the web, science and healthcare data, good jokes | Coding bootcamp student #CodingBootcamp, Habit stacker | 🥳 | 📬 DMs open",
            "url": "https://t.co/7UhEg21PHp",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "https://t.co/7UhEg21PHp",
                            "expanded_url": "https://github.com/dpappo",
                            "display_url": "github.com/dpappo",
                            "indices": [
                                0,
                                23
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 8,
            "friends_count": 18,
            "listed_count": 0,
            "created_at": "Sun Jan 17 22:52:44 +0000 2021",
            "favourites_count": 11,
            "utc_offset": null,
            "time_zone": null,
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 20,
            "lang": null,
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "F5F8FA",
            "profile_background_image_url": null,
            "profile_background_image_url_https": null,
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/1350939215836680195/rVqUYoi8_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/1350939215836680195/rVqUYoi8_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/1350939104444370945/1617801337",
            "profile_link_color": "1DA1F2",
            "profile_sidebar_border_color": "C0DEED",
            "profile_sidebar_fill_color": "DDEEF6",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": true,
            "default_profile": true,
            "default_profile_image": false,
            "following": false,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 0,
        "favorite_count": 0,
        "favorited": false,
        "retweeted": false,
        "lang": "en"
    },
    {
        "created_at": "Sat Apr 10 19:37:19 +0000 2021",
        "id": 1380968154948640800,
        "id_str": "1380968154948640770",
        "full_text": "As usual, added to the \"CSS Tips\" archive.\n\nhttps://t.co/Frpi8DqOUn",
        "truncated": false,
        "display_text_range": [
            0,
            67
        ],
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [
                {
                    "url": "https://t.co/Frpi8DqOUn",
                    "expanded_url": "https://markodenic.com/css-tips/",
                    "display_url": "markodenic.com/css-tips/",
                    "indices": [
                        44,
                        67
                    ]
                }
            ]
        },
        "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
        "in_reply_to_status_id": 1380592888355115000,
        "in_reply_to_status_id_str": "1380592888355115011",
        "in_reply_to_user_id": 202982523,
        "in_reply_to_user_id_str": "202982523",
        "in_reply_to_screen_name": "denicmarko",
        "user": {
            "id": 202982523,
            "id_str": "202982523",
            "name": "Marko ⚡ Denic",
            "screen_name": "denicmarko",
            "location": "𝘈𝘶𝘴𝘵𝘳𝘪𝘢 🌍",
            "description": "Software Engineer.",
            "url": "https://t.co/uwhtSNWmwU",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "https://t.co/uwhtSNWmwU",
                            "expanded_url": "https://markodenic.com/",
                            "display_url": "markodenic.com",
                            "indices": [
                                0,
                                23
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 48119,
            "friends_count": 390,
            "listed_count": 977,
            "created_at": "Fri Oct 15 07:47:09 +0000 2010",
            "favourites_count": 45820,
            "utc_offset": null,
            "time_zone": null,
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 8845,
            "lang": null,
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "000000",
            "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
            "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/1308385514744098816/oDXuaci__normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/1308385514744098816/oDXuaci__normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/202982523/1589663754",
            "profile_link_color": "19CF86",
            "profile_sidebar_border_color": "000000",
            "profile_sidebar_fill_color": "000000",
            "profile_text_color": "000000",
            "profile_use_background_image": false,
            "has_extended_profile": true,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 0,
        "favorite_count": 9,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Sat Apr 10 16:43:25 +0000 2021",
        "id": 1380924388795555800,
        "id_str": "1380924388795555842",
        "full_text": "Great thread, @gregisenberg. \n\nI should share the full Product Hunt story. Someday. 😊 https://t.co/dzs8diWFvD",
        "truncated": false,
        "display_text_range": [
            0,
            85
        ],
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [
                {
                    "screen_name": "gregisenberg",
                    "name": "GREG ISENBERG",
                    "id": 14642331,
                    "id_str": "14642331",
                    "indices": [
                        14,
                        27
                    ]
                }
            ],
            "urls": [
                {
                    "url": "https://t.co/dzs8diWFvD",
                    "expanded_url": "https://twitter.com/gregisenberg/status/1380918989501706242",
                    "display_url": "twitter.com/gregisenberg/s…",
                    "indices": [
                        86,
                        109
                    ]
                }
            ]
        },
        "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 14417215,
            "id_str": "14417215",
            "name": "Ryan Hoover",
            "screen_name": "rrhoover",
            "location": "SF ✈️ LA",
            "description": "Founder of @ProductHunt, @WeekendFund investor. Real likes, no gimmicks. ✌️😸",
            "url": "https://t.co/VLxasSSnAI",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "https://t.co/VLxasSSnAI",
                            "expanded_url": "https://ryanhoover.me",
                            "display_url": "ryanhoover.me",
                            "indices": [
                                0,
                                23
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 166190,
            "friends_count": 2072,
            "listed_count": 4403,
            "created_at": "Thu Apr 17 05:45:18 +0000 2008",
            "favourites_count": 316414,
            "utc_offset": null,
            "time_zone": null,
            "geo_enabled": true,
            "verified": true,
            "statuses_count": 131524,
            "lang": null,
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "FCFCFC",
            "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
            "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/1289046130366406656/-s-fxoLn_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/1289046130366406656/-s-fxoLn_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/14417215/1392518773",
            "profile_link_color": "3880C9",
            "profile_sidebar_border_color": "000000",
            "profile_sidebar_fill_color": "CCCCCC",
            "profile_text_color": "222222",
            "profile_use_background_image": true,
            "has_extended_profile": true,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": true,
        "quoted_status_id": 1380918989501706200,
        "quoted_status_id_str": "1380918989501706242",
        "quoted_status_permalink": {
            "url": "https://t.co/dzs8diWFvD",
            "expanded": "https://twitter.com/gregisenberg/status/1380918989501706242",
            "display": "twitter.com/gregisenberg/s…"
        },
        "quoted_status": {
            "created_at": "Sat Apr 10 16:21:57 +0000 2021",
            "id": 1380918989501706200,
            "id_str": "1380918989501706242",
            "full_text": "Here’s the story of how I (almost) lost everything building and selling my last company Islands to WeWork\n\nI’ve never told this story publicly. Sharing it on Twitter because sharing is caring\n\nHere we go…...",
            "truncated": false,
            "display_text_range": [
                0,
                207
            ],
            "entities": {
                "hashtags": [],
                "symbols": [],
                "user_mentions": [],
                "urls": []
            },
            "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
                "id": 14642331,
                "id_str": "14642331",
                "name": "GREG ISENBERG",
                "screen_name": "gregisenberg",
                "location": "subscribe to my substack  ",
                "description": "Follow me to learn about internet communities and community-based companies 💫  CEO: @latecheckoutplz",
                "url": "https://t.co/8xYZQAne9P",
                "entities": {
                    "url": {
                        "urls": [
                            {
                                "url": "https://t.co/8xYZQAne9P",
                                "expanded_url": "https://latecheckout.substack.com/",
                                "display_url": "latecheckout.substack.com",
                                "indices": [
                                    0,
                                    23
                                ]
                            }
                        ]
                    },
                    "description": {
                        "urls": []
                    }
                },
                "protected": false,
                "followers_count": 114229,
                "friends_count": 587,
                "listed_count": 1699,
                "created_at": "Sat May 03 23:08:05 +0000 2008",
                "favourites_count": 32810,
                "utc_offset": null,
                "time_zone": null,
                "geo_enabled": true,
                "verified": true,
                "statuses_count": 35925,
                "lang": null,
                "contributors_enabled": false,
                "is_translator": false,
                "is_translation_enabled": false,
                "profile_background_color": "F5F5F5",
                "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
                "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
                "profile_background_tile": false,
                "profile_image_url": "http://pbs.twimg.com/profile_images/1270003404463656962/y7XDZdyu_normal.jpg",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/1270003404463656962/y7XDZdyu_normal.jpg",
                "profile_banner_url": "https://pbs.twimg.com/profile_banners/14642331/1591627303",
                "profile_link_color": "1B95E0",
                "profile_sidebar_border_color": "FFFFFF",
                "profile_sidebar_fill_color": "FFFFFF",
                "profile_text_color": "232630",
                "profile_use_background_image": false,
                "has_extended_profile": true,
                "default_profile": false,
                "default_profile_image": false,
                "following": false,
                "follow_request_sent": false,
                "notifications": false,
                "translator_type": "none"
            },
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 118,
            "favorite_count": 1090,
            "favorited": false,
            "retweeted": false,
            "lang": "en"
        },
        "retweet_count": 2,
        "favorite_count": 80,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Sat Apr 10 16:24:37 +0000 2021",
        "id": 1380919660233773000,
        "id_str": "1380919660233773056",
        "full_text": "📽️ @wewatch_app update\n\nAfter reaching out to about 100 people, I found someone influential to take partial app ownership and help me market the app to a younger audience\n\nAlso, my buddy quickly sketched this logo for me and I love it.\n\n#BuildInPublic https://t.co/sLUqqBdmcr",
        "truncated": false,
        "display_text_range": [
            0,
            251
        ],
        "entities": {
            "hashtags": [
                {
                    "text": "BuildInPublic",
                    "indices": [
                        237,
                        251
                    ]
                }
            ],
            "symbols": [],
            "user_mentions": [
                {
                    "screen_name": "wewatch_app",
                    "name": "WeWatch",
                    "id": 1373322032243482600,
                    "id_str": "1373322032243482634",
                    "indices": [
                        3,
                        15
                    ]
                }
            ],
            "urls": [],
            "media": [
                {
                    "id": 1380919018870149000,
                    "id_str": "1380919018870149122",
                    "indices": [
                        252,
                        275
                    ],
                    "media_url": "http://pbs.twimg.com/media/EyoCh_9WEAIsBc4.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/EyoCh_9WEAIsBc4.jpg",
                    "url": "https://t.co/sLUqqBdmcr",
                    "display_url": "pic.twitter.com/sLUqqBdmcr",
                    "expanded_url": "https://twitter.com/_joshuafonseca/status/1380919660233773056/photo/1",
                    "type": "photo",
                    "sizes": {
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "small": {
                            "w": 680,
                            "h": 510,
                            "resize": "fit"
                        },
                        "large": {
                            "w": 2048,
                            "h": 1535,
                            "resize": "fit"
                        },
                        "medium": {
                            "w": 1200,
                            "h": 899,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "extended_entities": {
            "media": [
                {
                    "id": 1380919018870149000,
                    "id_str": "1380919018870149122",
                    "indices": [
                        252,
                        275
                    ],
                    "media_url": "http://pbs.twimg.com/media/EyoCh_9WEAIsBc4.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/EyoCh_9WEAIsBc4.jpg",
                    "url": "https://t.co/sLUqqBdmcr",
                    "display_url": "pic.twitter.com/sLUqqBdmcr",
                    "expanded_url": "https://twitter.com/_joshuafonseca/status/1380919660233773056/photo/1",
                    "type": "photo",
                    "sizes": {
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "small": {
                            "w": 680,
                            "h": 510,
                            "resize": "fit"
                        },
                        "large": {
                            "w": 2048,
                            "h": 1535,
                            "resize": "fit"
                        },
                        "medium": {
                            "w": 1200,
                            "h": 899,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 1340013546986500000,
            "id_str": "1340013546986500097",
            "name": "joshua fonseca",
            "screen_name": "_joshuafonseca",
            "location": "Chicago, IL",
            "description": "developer | cyborg\npreviously: @uchicago\n\n📚 https://t.co/LuzpHFfKBu\n📽️ https://t.co/hxvqgmetPw\n📔 https://t.co/vfU4KQHYqG",
            "url": "https://t.co/Xuy3fAOuvn",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "https://t.co/Xuy3fAOuvn",
                            "expanded_url": "https://jerseyfonseca.com/",
                            "display_url": "jerseyfonseca.com",
                            "indices": [
                                0,
                                23
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": [
                        {
                            "url": "https://t.co/LuzpHFfKBu",
                            "expanded_url": "https://swapiverse.com/",
                            "display_url": "swapiverse.com",
                            "indices": [
                                44,
                                67
                            ]
                        },
                        {
                            "url": "https://t.co/hxvqgmetPw",
                            "expanded_url": "https://wewatchapp.xyz/",
                            "display_url": "wewatchapp.xyz",
                            "indices": [
                                71,
                                94
                            ]
                        },
                        {
                            "url": "https://t.co/vfU4KQHYqG",
                            "expanded_url": "https://github.com/vuciv/vim-bujo",
                            "display_url": "github.com/vuciv/vim-bujo",
                            "indices": [
                                97,
                                120
                            ]
                        }
                    ]
                }
            },
            "protected": false,
            "followers_count": 255,
            "friends_count": 217,
            "listed_count": 4,
            "created_at": "Fri Dec 18 19:18:27 +0000 2020",
            "favourites_count": 1660,
            "utc_offset": null,
            "time_zone": null,
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 607,
            "lang": null,
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "F5F8FA",
            "profile_background_image_url": null,
            "profile_background_image_url_https": null,
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/1377426633523617794/DT2fFYnK_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/1377426633523617794/DT2fFYnK_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/1340013546986500097/1617398238",
            "profile_link_color": "1DA1F2",
            "profile_sidebar_border_color": "C0DEED",
            "profile_sidebar_fill_color": "DDEEF6",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": true,
            "default_profile": true,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 0,
        "favorite_count": 4,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Sat Apr 10 15:46:21 +0000 2021",
        "id": 1380910029658816500,
        "id_str": "1380910029658816516",
        "full_text": "Weekend dad life tweet:\n\nMy 2yo wanted to join me on my run today to see some boats at the river. She fell asleep 500m from home because she’d previously refused to nap, then couldn’t be roused.\n\nGuess what she was upset about missing when we got home and she finally woke up? 🙃",
        "truncated": false,
        "display_text_range": [
            0,
            278
        ],
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": []
        },
        "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 1179673614293045200,
            "id_str": "1179673614293045250",
            "name": "Ben Barbersmith 🧬",
            "screen_name": "benbarbersmith",
            "location": "Reading, UK",
            "description": "Runner, dev, founder, feminist, dad. Ex-Google. Super lucky!\n\nBootstrapping, parenting & living to enjoy the year 2100. Building https://t.co/LXmnklRJSg in public.",
            "url": "https://t.co/OrAn1GFgDg",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "https://t.co/OrAn1GFgDg",
                            "expanded_url": "https://www.barbersmith.com/",
                            "display_url": "barbersmith.com",
                            "indices": [
                                0,
                                23
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": [
                        {
                            "url": "https://t.co/LXmnklRJSg",
                            "expanded_url": "http://sqlforhumans.com",
                            "display_url": "sqlforhumans.com",
                            "indices": [
                                129,
                                152
                            ]
                        }
                    ]
                }
            },
            "protected": false,
            "followers_count": 4194,
            "friends_count": 757,
            "listed_count": 65,
            "created_at": "Thu Oct 03 08:24:48 +0000 2019",
            "favourites_count": 16799,
            "utc_offset": null,
            "time_zone": null,
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 3360,
            "lang": null,
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "F5F8FA",
            "profile_background_image_url": null,
            "profile_background_image_url_https": null,
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/1332690145099862016/Jqle_tE6_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/1332690145099862016/Jqle_tE6_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/1179673614293045250/1606660331",
            "profile_link_color": "1DA1F2",
            "profile_sidebar_border_color": "C0DEED",
            "profile_sidebar_fill_color": "DDEEF6",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": true,
            "default_profile": true,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 0,
        "favorite_count": 23,
        "favorited": false,
        "retweeted": false,
        "lang": "en"
    },
    {
        "created_at": "Sat Apr 10 15:41:00 +0000 2021",
        "id": 1380908680988614700,
        "id_str": "1380908680988614658",
        "full_text": "Happy to see another guide on #BuildingInPublic.\n\nGo read it if you want to learn more 😌 https://t.co/4nhdtNJYDW",
        "truncated": false,
        "display_text_range": [
            0,
            88
        ],
        "entities": {
            "hashtags": [
                {
                    "text": "BuildingInPublic",
                    "indices": [
                        30,
                        47
                    ]
                }
            ],
            "symbols": [],
            "user_mentions": [],
            "urls": [
                {
                    "url": "https://t.co/4nhdtNJYDW",
                    "expanded_url": "https://twitter.com/JelmerPe/status/1380579069474041857",
                    "display_url": "twitter.com/JelmerPe/statu…",
                    "indices": [
                        89,
                        112
                    ]
                }
            ]
        },
        "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 51882249,
            "id_str": "51882249",
            "name": "Kevon Cheung 🥦",
            "screen_name": "MeetKevon",
            "location": "🌎 Join my newsletter ▶▶",
            "description": "tweet about being transparent, building stuff, and newbie fathering | #BuildingInPublic | run https://t.co/zKGay8BJT8 🙌 | my mind library: https://t.co/DhFmsao84e | DMs Open 📩",
            "url": "https://t.co/jDg8Ntta5p",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "https://t.co/jDg8Ntta5p",
                            "expanded_url": "https://kevoncheung.com/newsletter",
                            "display_url": "kevoncheung.com/newsletter",
                            "indices": [
                                0,
                                23
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": [
                        {
                            "url": "https://t.co/zKGay8BJT8",
                            "expanded_url": "http://publiclab.co",
                            "display_url": "publiclab.co",
                            "indices": [
                                94,
                                117
                            ]
                        },
                        {
                            "url": "https://t.co/DhFmsao84e",
                            "expanded_url": "http://bit.ly/kcmindlib",
                            "display_url": "bit.ly/kcmindlib",
                            "indices": [
                                139,
                                162
                            ]
                        }
                    ]
                }
            },
            "protected": false,
            "followers_count": 2451,
            "friends_count": 883,
            "listed_count": 80,
            "created_at": "Sun Jun 28 23:31:11 +0000 2009",
            "favourites_count": 9681,
            "utc_offset": null,
            "time_zone": null,
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 4445,
            "lang": null,
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "000000",
            "profile_background_image_url": "http://abs.twimg.com/images/themes/theme5/bg.gif",
            "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme5/bg.gif",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/1380310422981464064/_PSDqMVz_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/1380310422981464064/_PSDqMVz_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/51882249/1614060018",
            "profile_link_color": "19CF86",
            "profile_sidebar_border_color": "000000",
            "profile_sidebar_fill_color": "000000",
            "profile_text_color": "000000",
            "profile_use_background_image": false,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": true,
        "quoted_status_id": 1380579069474041900,
        "quoted_status_id_str": "1380579069474041857",
        "quoted_status_permalink": {
            "url": "https://t.co/4nhdtNJYDW",
            "expanded": "https://twitter.com/JelmerPe/status/1380579069474041857",
            "display": "twitter.com/JelmerPe/statu…"
        },
        "quoted_status": {
            "created_at": "Fri Apr 09 17:51:14 +0000 2021",
            "id": 1380579069474041900,
            "id_str": "1380579069474041857",
            "full_text": "Marketing and sales are hard...\n\nEspecially when you’d rather be spending that time building 🔥 products!\n\nTo help you out,\nwe wrote The Ultimate Guide to #buildinpublic 📢 \n\nRead Part 1 here 👉 https://t.co/v969rlE9Uo\n\nThanks to 🙏🏻 @thisiskp_ @MeetKevon @JanelSGM and @nocodelife https://t.co/FhoBcDldZZ",
            "truncated": false,
            "display_text_range": [
                0,
                277
            ],
            "entities": {
                "hashtags": [
                    {
                        "text": "buildinpublic",
                        "indices": [
                            154,
                            168
                        ]
                    }
                ],
                "symbols": [],
                "user_mentions": [
                    {
                        "screen_name": "thisiskp_",
                        "name": "KP",
                        "id": 4736729423,
                        "id_str": "4736729423",
                        "indices": [
                            230,
                            240
                        ]
                    },
                    {
                        "screen_name": "MeetKevon",
                        "name": "Kevon Cheung 🥦",
                        "id": 51882249,
                        "id_str": "51882249",
                        "indices": [
                            241,
                            251
                        ]
                    },
                    {
                        "screen_name": "JanelSGM",
                        "name": "Janel",
                        "id": 1688823739,
                        "id_str": "1688823739",
                        "indices": [
                            252,
                            261
                        ]
                    },
                    {
                        "screen_name": "nocodelife",
                        "name": "Kieran 🚀 2021 goal: Build a SaaS with #nocode",
                        "id": 1181732088757854200,
                        "id_str": "1181732088757854208",
                        "indices": [
                            266,
                            277
                        ]
                    }
                ],
                "urls": [
                    {
                        "url": "https://t.co/v969rlE9Uo",
                        "expanded_url": "https://bit.ly/39Ytg54",
                        "display_url": "bit.ly/39Ytg54",
                        "indices": [
                            192,
                            215
                        ]
                    }
                ],
                "media": [
                    {
                        "id": 1380577128257880000,
                        "id_str": "1380577128257880067",
                        "indices": [
                            278,
                            301
                        ],
                        "media_url": "http://pbs.twimg.com/media/EyjLlWLXAAMCaA3.jpg",
                        "media_url_https": "https://pbs.twimg.com/media/EyjLlWLXAAMCaA3.jpg",
                        "url": "https://t.co/FhoBcDldZZ",
                        "display_url": "pic.twitter.com/FhoBcDldZZ",
                        "expanded_url": "https://twitter.com/JelmerPe/status/1380579069474041857/photo/1",
                        "type": "photo",
                        "sizes": {
                            "thumb": {
                                "w": 150,
                                "h": 150,
                                "resize": "crop"
                            },
                            "large": {
                                "w": 1456,
                                "h": 899,
                                "resize": "fit"
                            },
                            "small": {
                                "w": 680,
                                "h": 420,
                                "resize": "fit"
                            },
                            "medium": {
                                "w": 1200,
                                "h": 741,
                                "resize": "fit"
                            }
                        }
                    }
                ]
            },
            "extended_entities": {
                "media": [
                    {
                        "id": 1380577128257880000,
                        "id_str": "1380577128257880067",
                        "indices": [
                            278,
                            301
                        ],
                        "media_url": "http://pbs.twimg.com/media/EyjLlWLXAAMCaA3.jpg",
                        "media_url_https": "https://pbs.twimg.com/media/EyjLlWLXAAMCaA3.jpg",
                        "url": "https://t.co/FhoBcDldZZ",
                        "display_url": "pic.twitter.com/FhoBcDldZZ",
                        "expanded_url": "https://twitter.com/JelmerPe/status/1380579069474041857/photo/1",
                        "type": "photo",
                        "sizes": {
                            "thumb": {
                                "w": 150,
                                "h": 150,
                                "resize": "crop"
                            },
                            "large": {
                                "w": 1456,
                                "h": 899,
                                "resize": "fit"
                            },
                            "small": {
                                "w": 680,
                                "h": 420,
                                "resize": "fit"
                            },
                            "medium": {
                                "w": 1200,
                                "h": 741,
                                "resize": "fit"
                            }
                        }
                    }
                ]
            },
            "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
                "id": 129456398,
                "id_str": "129456398",
                "name": "Jelmer Pé",
                "screen_name": "JelmerPe",
                "location": "Netherlands",
                "description": "I tweet about building NoCode Startups⚡️ \nCo-founder https://t.co/7oX5aTBk81 | Venture Builder at https://t.co/r7DHwRs9cV | Fellow @beondeck #ODNC1",
                "url": "https://t.co/TrYarFSGgR",
                "entities": {
                    "url": {
                        "urls": [
                            {
                                "url": "https://t.co/TrYarFSGgR",
                                "expanded_url": "http://venturism.io",
                                "display_url": "venturism.io",
                                "indices": [
                                    0,
                                    23
                                ]
                            }
                        ]
                    },
                    "description": {
                        "urls": [
                            {
                                "url": "https://t.co/7oX5aTBk81",
                                "expanded_url": "http://venturism.io",
                                "display_url": "venturism.io",
                                "indices": [
                                    53,
                                    76
                                ]
                            },
                            {
                                "url": "https://t.co/r7DHwRs9cV",
                                "expanded_url": "http://bundl.com",
                                "display_url": "bundl.com",
                                "indices": [
                                    98,
                                    121
                                ]
                            }
                        ]
                    }
                },
                "protected": false,
                "followers_count": 958,
                "friends_count": 791,
                "listed_count": 49,
                "created_at": "Sun Apr 04 10:08:48 +0000 2010",
                "favourites_count": 7353,
                "utc_offset": null,
                "time_zone": null,
                "geo_enabled": false,
                "verified": false,
                "statuses_count": 6038,
                "lang": null,
                "contributors_enabled": false,
                "is_translator": false,
                "is_translation_enabled": false,
                "profile_background_color": "C0DEED",
                "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
                "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
                "profile_background_tile": false,
                "profile_image_url": "http://pbs.twimg.com/profile_images/1098840698424578048/e1sWOH7f_normal.jpg",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/1098840698424578048/e1sWOH7f_normal.jpg",
                "profile_banner_url": "https://pbs.twimg.com/profile_banners/129456398/1617970210",
                "profile_link_color": "1DA1F2",
                "profile_sidebar_border_color": "C0DEED",
                "profile_sidebar_fill_color": "DDEEF6",
                "profile_text_color": "333333",
                "profile_use_background_image": true,
                "has_extended_profile": true,
                "default_profile": true,
                "default_profile_image": false,
                "following": false,
                "follow_request_sent": false,
                "notifications": false,
                "translator_type": "none"
            },
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 5,
            "favorite_count": 50,
            "favorited": false,
            "retweeted": false,
            "possibly_sensitive": false,
            "possibly_sensitive_appealable": false,
            "lang": "en"
        },
        "retweet_count": 0,
        "favorite_count": 12,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Sat Apr 10 14:57:00 +0000 2021",
        "id": 1380897607430496300,
        "id_str": "1380897607430496259",
        "full_text": "I always try and retweet someone's launch. \n\nWe all know how much it takes to launch. That in and of itself should be celebrated 🥳",
        "truncated": false,
        "display_text_range": [
            0,
            130
        ],
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": []
        },
        "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 1340013546986500000,
            "id_str": "1340013546986500097",
            "name": "joshua fonseca",
            "screen_name": "_joshuafonseca",
            "location": "Chicago, IL",
            "description": "developer | cyborg\npreviously: @uchicago\n\n📚 https://t.co/LuzpHFfKBu\n📽️ https://t.co/hxvqgmetPw\n📔 https://t.co/vfU4KQHYqG",
            "url": "https://t.co/Xuy3fAOuvn",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "https://t.co/Xuy3fAOuvn",
                            "expanded_url": "https://jerseyfonseca.com/",
                            "display_url": "jerseyfonseca.com",
                            "indices": [
                                0,
                                23
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": [
                        {
                            "url": "https://t.co/LuzpHFfKBu",
                            "expanded_url": "https://swapiverse.com/",
                            "display_url": "swapiverse.com",
                            "indices": [
                                44,
                                67
                            ]
                        },
                        {
                            "url": "https://t.co/hxvqgmetPw",
                            "expanded_url": "https://wewatchapp.xyz/",
                            "display_url": "wewatchapp.xyz",
                            "indices": [
                                71,
                                94
                            ]
                        },
                        {
                            "url": "https://t.co/vfU4KQHYqG",
                            "expanded_url": "https://github.com/vuciv/vim-bujo",
                            "display_url": "github.com/vuciv/vim-bujo",
                            "indices": [
                                97,
                                120
                            ]
                        }
                    ]
                }
            },
            "protected": false,
            "followers_count": 255,
            "friends_count": 217,
            "listed_count": 4,
            "created_at": "Fri Dec 18 19:18:27 +0000 2020",
            "favourites_count": 1660,
            "utc_offset": null,
            "time_zone": null,
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 607,
            "lang": null,
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "F5F8FA",
            "profile_background_image_url": null,
            "profile_background_image_url_https": null,
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/1377426633523617794/DT2fFYnK_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/1377426633523617794/DT2fFYnK_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/1340013546986500097/1617398238",
            "profile_link_color": "1DA1F2",
            "profile_sidebar_border_color": "C0DEED",
            "profile_sidebar_fill_color": "DDEEF6",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": true,
            "default_profile": true,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 0,
        "favorite_count": 23,
        "favorited": true,
        "retweeted": false,
        "lang": "en"
    },
    {
        "created_at": "Sat Apr 10 14:52:22 +0000 2021",
        "id": 1380896442651455500,
        "id_str": "1380896442651455496",
        "full_text": "RT @Natalie_Furn: It's official, Minimal Viable Stack has launched. Early access is open to #nocode / #lowcode makers.\n\nSign up to build yo…",
        "truncated": false,
        "display_text_range": [
            0,
            140
        ],
        "entities": {
            "hashtags": [
                {
                    "text": "nocode",
                    "indices": [
                        92,
                        99
                    ]
                },
                {
                    "text": "lowcode",
                    "indices": [
                        102,
                        110
                    ]
                }
            ],
            "symbols": [],
            "user_mentions": [
                {
                    "screen_name": "Natalie_Furn",
                    "name": "🍊 Natalie Furness",
                    "id": 919980601087840300,
                    "id_str": "919980601087840257",
                    "indices": [
                        3,
                        16
                    ]
                }
            ],
            "urls": []
        },
        "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 1340013546986500000,
            "id_str": "1340013546986500097",
            "name": "joshua fonseca",
            "screen_name": "_joshuafonseca",
            "location": "Chicago, IL",
            "description": "developer | cyborg\npreviously: @uchicago\n\n📚 https://t.co/LuzpHFfKBu\n📽️ https://t.co/hxvqgmetPw\n📔 https://t.co/vfU4KQHYqG",
            "url": "https://t.co/Xuy3fAOuvn",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "https://t.co/Xuy3fAOuvn",
                            "expanded_url": "https://jerseyfonseca.com/",
                            "display_url": "jerseyfonseca.com",
                            "indices": [
                                0,
                                23
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": [
                        {
                            "url": "https://t.co/LuzpHFfKBu",
                            "expanded_url": "https://swapiverse.com/",
                            "display_url": "swapiverse.com",
                            "indices": [
                                44,
                                67
                            ]
                        },
                        {
                            "url": "https://t.co/hxvqgmetPw",
                            "expanded_url": "https://wewatchapp.xyz/",
                            "display_url": "wewatchapp.xyz",
                            "indices": [
                                71,
                                94
                            ]
                        },
                        {
                            "url": "https://t.co/vfU4KQHYqG",
                            "expanded_url": "https://github.com/vuciv/vim-bujo",
                            "display_url": "github.com/vuciv/vim-bujo",
                            "indices": [
                                97,
                                120
                            ]
                        }
                    ]
                }
            },
            "protected": false,
            "followers_count": 255,
            "friends_count": 217,
            "listed_count": 4,
            "created_at": "Fri Dec 18 19:18:27 +0000 2020",
            "favourites_count": 1660,
            "utc_offset": null,
            "time_zone": null,
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 607,
            "lang": null,
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "F5F8FA",
            "profile_background_image_url": null,
            "profile_background_image_url_https": null,
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/1377426633523617794/DT2fFYnK_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/1377426633523617794/DT2fFYnK_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/1340013546986500097/1617398238",
            "profile_link_color": "1DA1F2",
            "profile_sidebar_border_color": "C0DEED",
            "profile_sidebar_fill_color": "DDEEF6",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": true,
            "default_profile": true,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "retweeted_status": {
            "created_at": "Sat Apr 10 13:51:08 +0000 2021",
            "id": 1380881034288451600,
            "id_str": "1380881034288451584",
            "full_text": "It's official, Minimal Viable Stack has launched. Early access is open to #nocode / #lowcode makers.\n\nSign up to build your maker profile, add your projects, collaborate and consult.\n\nhttps://t.co/jiaqF7kofB - RT to spread the word! https://t.co/Jw9tcFRvu1",
            "truncated": false,
            "display_text_range": [
                0,
                232
            ],
            "entities": {
                "hashtags": [
                    {
                        "text": "nocode",
                        "indices": [
                            74,
                            81
                        ]
                    },
                    {
                        "text": "lowcode",
                        "indices": [
                            84,
                            92
                        ]
                    }
                ],
                "symbols": [],
                "user_mentions": [],
                "urls": [
                    {
                        "url": "https://t.co/jiaqF7kofB",
                        "expanded_url": "http://www.minimalviablestack.com",
                        "display_url": "minimalviablestack.com",
                        "indices": [
                            184,
                            207
                        ]
                    }
                ],
                "media": [
                    {
                        "id": 1380881031318884400,
                        "id_str": "1380881031318884352",
                        "indices": [
                            233,
                            256
                        ],
                        "media_url": "http://pbs.twimg.com/media/Eynf-1TWUAAQ8jg.jpg",
                        "media_url_https": "https://pbs.twimg.com/media/Eynf-1TWUAAQ8jg.jpg",
                        "url": "https://t.co/Jw9tcFRvu1",
                        "display_url": "pic.twitter.com/Jw9tcFRvu1",
                        "expanded_url": "https://twitter.com/Natalie_Furn/status/1380881034288451584/photo/1",
                        "type": "photo",
                        "sizes": {
                            "thumb": {
                                "w": 150,
                                "h": 150,
                                "resize": "crop"
                            },
                            "small": {
                                "w": 680,
                                "h": 383,
                                "resize": "fit"
                            },
                            "large": {
                                "w": 1600,
                                "h": 900,
                                "resize": "fit"
                            },
                            "medium": {
                                "w": 1200,
                                "h": 675,
                                "resize": "fit"
                            }
                        }
                    }
                ]
            },
            "extended_entities": {
                "media": [
                    {
                        "id": 1380881031318884400,
                        "id_str": "1380881031318884352",
                        "indices": [
                            233,
                            256
                        ],
                        "media_url": "http://pbs.twimg.com/media/Eynf-1TWUAAQ8jg.jpg",
                        "media_url_https": "https://pbs.twimg.com/media/Eynf-1TWUAAQ8jg.jpg",
                        "url": "https://t.co/Jw9tcFRvu1",
                        "display_url": "pic.twitter.com/Jw9tcFRvu1",
                        "expanded_url": "https://twitter.com/Natalie_Furn/status/1380881034288451584/photo/1",
                        "type": "photo",
                        "sizes": {
                            "thumb": {
                                "w": 150,
                                "h": 150,
                                "resize": "crop"
                            },
                            "small": {
                                "w": 680,
                                "h": 383,
                                "resize": "fit"
                            },
                            "large": {
                                "w": 1600,
                                "h": 900,
                                "resize": "fit"
                            },
                            "medium": {
                                "w": 1200,
                                "h": 675,
                                "resize": "fit"
                            }
                        }
                    }
                ]
            },
            "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
                "id": 919980601087840300,
                "id_str": "919980601087840257",
                "name": "🍊 Natalie Furness",
                "screen_name": "Natalie_Furn",
                "location": "United Kingdom",
                "description": "Sharing knowledge on Nocode making + marketing for the creator economy. B2B Fractional CMO, @Hubspot consultant. Launching new products every month.",
                "url": "https://t.co/jYaubeTz35",
                "entities": {
                    "url": {
                        "urls": [
                            {
                                "url": "https://t.co/jYaubeTz35",
                                "expanded_url": "https://linktr.ee/Natalie_furn",
                                "display_url": "linktr.ee/Natalie_furn",
                                "indices": [
                                    0,
                                    23
                                ]
                            }
                        ]
                    },
                    "description": {
                        "urls": []
                    }
                },
                "protected": false,
                "followers_count": 2891,
                "friends_count": 2339,
                "listed_count": 91,
                "created_at": "Mon Oct 16 17:37:22 +0000 2017",
                "favourites_count": 10775,
                "utc_offset": null,
                "time_zone": null,
                "geo_enabled": true,
                "verified": false,
                "statuses_count": 7947,
                "lang": null,
                "contributors_enabled": false,
                "is_translator": false,
                "is_translation_enabled": false,
                "profile_background_color": "F5F8FA",
                "profile_background_image_url": null,
                "profile_background_image_url_https": null,
                "profile_background_tile": false,
                "profile_image_url": "http://pbs.twimg.com/profile_images/1364562852158312449/6e_Q9WjG_normal.jpg",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/1364562852158312449/6e_Q9WjG_normal.jpg",
                "profile_banner_url": "https://pbs.twimg.com/profile_banners/919980601087840257/1617744593",
                "profile_link_color": "1DA1F2",
                "profile_sidebar_border_color": "C0DEED",
                "profile_sidebar_fill_color": "DDEEF6",
                "profile_text_color": "333333",
                "profile_use_background_image": true,
                "has_extended_profile": false,
                "default_profile": true,
                "default_profile_image": false,
                "following": false,
                "follow_request_sent": false,
                "notifications": false,
                "translator_type": "none"
            },
            "geo": null,
            "coordinates": null,
            "place": {
                "id": "7de31e05e99a00f8",
                "url": "https://api.twitter.com/1.1/geo/id/7de31e05e99a00f8.json",
                "place_type": "city",
                "name": "Bournemouth",
                "full_name": "Bournemouth, England",
                "country_code": "GB",
                "country": "United Kingdom",
                "contained_within": [],
                "bounding_box": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                -1.93759,
                                50.7095004
                            ],
                            [
                                -1.7676241,
                                50.7095004
                            ],
                            [
                                -1.7676241,
                                50.775036
                            ],
                            [
                                -1.93759,
                                50.775036
                            ]
                        ]
                    ]
                },
                "attributes": {}
            },
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 4,
            "favorite_count": 8,
            "favorited": false,
            "retweeted": false,
            "possibly_sensitive": false,
            "possibly_sensitive_appealable": false,
            "lang": "en"
        },
        "is_quote_status": false,
        "retweet_count": 4,
        "favorite_count": 0,
        "favorited": false,
        "retweeted": false,
        "lang": "en"
    },
    {
        "created_at": "Sat Apr 10 14:42:29 +0000 2021",
        "id": 1380893955269648400,
        "id_str": "1380893955269648387",
        "full_text": "37% of podcasts only have 2 episodes or less 😬 The Internet is indeed filled with a lot of legacy.\n\nhttps://t.co/vh1aJxUCid",
        "truncated": false,
        "display_text_range": [
            0,
            123
        ],
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [
                {
                    "url": "https://t.co/vh1aJxUCid",
                    "expanded_url": "https://www.amplifimedia.com/blogstein/why-there-really-arent-2-million-podcasts",
                    "display_url": "amplifimedia.com/blogstein/why-…",
                    "indices": [
                        100,
                        123
                    ]
                }
            ]
        },
        "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 51882249,
            "id_str": "51882249",
            "name": "Kevon Cheung 🥦",
            "screen_name": "MeetKevon",
            "location": "🌎 Join my newsletter ▶▶",
            "description": "tweet about being transparent, building stuff, and newbie fathering | #BuildingInPublic | run https://t.co/zKGay8BJT8 🙌 | my mind library: https://t.co/DhFmsao84e | DMs Open 📩",
            "url": "https://t.co/jDg8Ntta5p",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "https://t.co/jDg8Ntta5p",
                            "expanded_url": "https://kevoncheung.com/newsletter",
                            "display_url": "kevoncheung.com/newsletter",
                            "indices": [
                                0,
                                23
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": [
                        {
                            "url": "https://t.co/zKGay8BJT8",
                            "expanded_url": "http://publiclab.co",
                            "display_url": "publiclab.co",
                            "indices": [
                                94,
                                117
                            ]
                        },
                        {
                            "url": "https://t.co/DhFmsao84e",
                            "expanded_url": "http://bit.ly/kcmindlib",
                            "display_url": "bit.ly/kcmindlib",
                            "indices": [
                                139,
                                162
                            ]
                        }
                    ]
                }
            },
            "protected": false,
            "followers_count": 2451,
            "friends_count": 883,
            "listed_count": 80,
            "created_at": "Sun Jun 28 23:31:11 +0000 2009",
            "favourites_count": 9681,
            "utc_offset": null,
            "time_zone": null,
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 4445,
            "lang": null,
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "000000",
            "profile_background_image_url": "http://abs.twimg.com/images/themes/theme5/bg.gif",
            "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme5/bg.gif",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/1380310422981464064/_PSDqMVz_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/1380310422981464064/_PSDqMVz_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/51882249/1614060018",
            "profile_link_color": "19CF86",
            "profile_sidebar_border_color": "000000",
            "profile_sidebar_fill_color": "000000",
            "profile_text_color": "000000",
            "profile_use_background_image": false,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 0,
        "favorite_count": 7,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Sat Apr 10 13:20:18 +0000 2021",
        "id": 1380873273555120000,
        "id_str": "1380873273555120140",
        "full_text": "Great piece on a woman who spent decades devoted to understanding mRNA, consistently ignored. \n\n“My dream was always that we develop something in the lab that helps people. I’ve satisfied my life’s dream.”\n\nhttps://t.co/GkAoiCqfri",
        "truncated": false,
        "display_text_range": [
            0,
            230
        ],
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [
                {
                    "url": "https://t.co/GkAoiCqfri",
                    "expanded_url": "https://www.nytimes.com/2021/04/08/health/coronavirus-mrna-kariko.html",
                    "display_url": "nytimes.com/2021/04/08/hea…",
                    "indices": [
                        207,
                        230
                    ]
                }
            ]
        },
        "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 284278132,
            "id_str": "284278132",
            "name": "Morgan Housel",
            "screen_name": "morganhousel",
            "location": "",
            "description": "@collabfund\n\nBook: https://t.co/B3yjv1Wdh3",
            "url": "https://t.co/eWVfAW78X9",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "https://t.co/eWVfAW78X9",
                            "expanded_url": "http://www.collaborativefund.com/blog",
                            "display_url": "collaborativefund.com/blog",
                            "indices": [
                                0,
                                23
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": [
                        {
                            "url": "https://t.co/B3yjv1Wdh3",
                            "expanded_url": "https://amzn.to/3bFkBT9",
                            "display_url": "amzn.to/3bFkBT9",
                            "indices": [
                                19,
                                42
                            ]
                        }
                    ]
                }
            },
            "protected": false,
            "followers_count": 259511,
            "friends_count": 603,
            "listed_count": 5082,
            "created_at": "Tue Apr 19 00:24:40 +0000 2011",
            "favourites_count": 68048,
            "utc_offset": null,
            "time_zone": null,
            "geo_enabled": false,
            "verified": true,
            "statuses_count": 17888,
            "lang": null,
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "131516",
            "profile_background_image_url": "http://abs.twimg.com/images/themes/theme14/bg.gif",
            "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme14/bg.gif",
            "profile_background_tile": true,
            "profile_image_url": "http://pbs.twimg.com/profile_images/1276544980740214785/GQUTaQBI_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/1276544980740214785/GQUTaQBI_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/284278132/1575852480",
            "profile_link_color": "009999",
            "profile_sidebar_border_color": "EEEEEE",
            "profile_sidebar_fill_color": "EFEFEF",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": true,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 77,
        "favorite_count": 461,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    }
]

  const tweetList = tweets.map(tweet => <div className="individualTweet"> <Tweet options={{width: "1000"}} key={tweet.id} tweetId={tweet.id_str}/></div>)
  


  return (<div className="tweetComponent">

  {tweetList}


  </div>
  )
}