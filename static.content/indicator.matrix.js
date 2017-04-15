var pflMatrix={
	indicators:{
		ixSH:{id:'ixSH', title:'Humor', dispOrder:0, descriptions:{
							default_en:"Exceptionally keen sense of the comical, the bizarre, or absurd.",
							kids_en:"I get totally silly about these things. My sense of humor goes wild."
							}
		},
		ixEIC:{id:'ixEIC',title:'Imagination and creativity', dispOrder:1, descriptions:{
							default_en:"Extraordinary ability to use ideas, processes, materials or anything else in ingenious, flexible or surprising ways.",
							kids_en:"I have a wild imagination. I say things, do things, think things, feel things in a way other kids don't."
							}
		},
		ixPIM:{id:'ixPIM', title:'Inquiry',  dispOrder:2, descriptions:{
							default_en:"Probes deeply while exploring ideas &amp; topics; asks deep questions; experiments with events, ideas, feelings, sounds, symbols, movement, etc.",
							kids_en:"I need to find answers to my own questions more than the teacher's questions. I want to test my ideas to see what might work and why."
							}
		},
		ixTM:{id:'ixTM', title:'Memory and processing',  dispOrder:3, descriptions:{
							default_en:"Tremendous capacity for dealing with large amounts of information and skills",
							kids_en:"I know lots more about this than any other kid my age."
							}
		},
		ixISA:{id:'ixISA',title:'Sensitivity',  dispOrder:4 ,descriptions:{
							default_en:"Unusually aware of or responsive to her/his own experiences and feelings and/or those of others.",
							kids_en:"I'm very sensitive. My feelings about these kinds of activities and the people I do them with are very strong."
							}
		},
		ixGC:{id:'ixGC',title:'Expressiveness',  dispOrder:5, descriptions:{
							default_en:"Extraordinary ability to communicate meaning or emotion through words, actions, symbols, sounds, or media.",
							kids_en:"I can explain my ideas very clearly. My explanations may be in words and numbers, but they might also be in actions or symbols or music or movement."
							}
		},
		ixRTW:{id:'ixRTW',title:'Reasoning',  dispOrder:6, descriptions:{
							default_en:"Loves to think; thinks things through, considers implications or alternatives; rich, flexible, highly conscious, analytical or logical thought. Thinking is not necessarily directed toward a goal or solution.",
							kids_en:"I love thinking about these kinds of things. I like to come up with lots of ideas and then predict the consequences before trying to do them."
							}
		},		
		ixSCP:{id:'ixSCP',title:'Problem-solving',  dispOrder:7, descriptions:{
							default_en:"Outstanding ability to find systematic solutions to problems; is able to invent and monitor many paths to a goal; seeks out challenging problems.",
							kids_en:"I love to solve hard, messy problems by inventing and checking lots of different solutions. I live for the challenge!"
							}
		},		
		ixIU:{id:'ixIU',title:'Intuition',  dispOrder:8, descriptions:{
							default_en:"Suddenly discovers connections or deeper meanings without conscious awareness of reasoning or thought.",
							kids_en:"I see connections between ideas that other kids don't. I can't explain how I know -- I just know!"
							}
		},		
		ixLE:{id:'ixLE',title:'Learning',  dispOrder:9, descriptions:{
							default_en:"Extremely able to grasp and use sophisticated new understandings quickly and easily.",
							kids_en:"I love learning the tough stuff. It is much easier for me to learn it is for other kids my age."
							}
		},		
		ixAPI:{id:'ixAPI',title:'Interests',  dispOrder:10, descriptions:{
							default_en:"Advanced, intensely focused curiousity; passionate; may focus on unusual topics; interest is sometimes fleeting but always intense.",
							kids_en:"I absolutely love this stuff, even if other kids think it is weird."
							}
		},				
		ixMEC:{id:'ixMEC',title:'Moral and ethical concerns',  dispOrder:11, descriptions:{
							default_en:"Extreme need for fairness and justice; will take action to resolve injustices; deeply concerned with the consequences of her or his actions.",
							kids_en:"I need to believe in an idea before doing anything about it. If it isn't fair to everyone or if it just feels wrong, I won't do it."
							}
		},				
		ixHMP:{id:'ixHMP',title:'Motivation',  dispOrder:12, descriptions:{
							default_en:"Persistent, intense need to know, do, feel, create, or understand.",
							kids_en:"I want MORE! Once I start I can't shut my mind off. I can&apos;t quit even when I run out of time in class."
							}
		}					
	},
	diffOptions:{
		contAbs:{
			id:"contAbs",title:"Abstractness", type: "content", indicators:['ixTM','ixGC','ixSCP','ixRTW','ixLE','ixMEC'], refId:181, description:{
						default_en:"The content focuses on abstract concepts, themes, generalizations and theories, not concrete facts. It addresses ideas that have a wide range of applicability."
					}
		},
		contComp:{
			id:"contComp",title:"Complexity", type: "content", indicators:['ixSH','ixPIM','ixTM','ixRTW','ixSCP','ixIU','ixMEC'], refId:183, description:{
						default_en:"Complex content focuses on the interconnections among concepts, principles, generalizations and theories. It is usually interdisciplinary."
					}
		},
		extTop:{
			id:"extTop",title:"Extracurricular Topics", type: "content", indicators:['ixSH','ixEIC','ixPIM','ixTM','ixLE','ixAPI','ixMEC'], refId:210, description:{
						default_en:"The content includes ideas and content areas not taught in the regular curriculum in any grade. It may include the student's interests."
					}
		},
		livLiv:{
			id:"livLiv",title:"Lives and Living", type: "content", indicators:['ixEIC','ixISA','ixMEC','ixHMP'], refId:382, description:{
						default_en:"The content involves the study of creative, productive people (living or dead), their motivations, social characteristics, challenges and career paths."
					}
		},
		orgLivVal:{
			id:"orgLivVal",title:"Organization for learning value", type: "content", indicators:['ixTM','ixRTW','ixIU','ixLE','ixMEC'], refId:384, description:{
						default_en:"The content of an entire unit addresses a broad, interdisciplinary theme (like 'systems' or 'patterns') rather than small, sequential bits of information."
					}
		},
		relLiTop:{
			id:"relLiTop",title:"Real Life Topics", type: "content", indicators:['ixPIM','ixGC','ixRTW','ixSCP','ixAPI','ixMEC','ixHMP'], refId:394, description:{
						default_en:"The content addresses issues, controversies, problems or provocative questions inspired by students' interests, experiences, questions and concerns. Students may need help focusing, analyzing, and/or defining their topic or questions."
					}
		},
		selSelCont:{
			id:"selSelCont",title:"Self-Selected Content", type: "content", indicators:['ixEIC','ixPIM','ixRTW','ixSCP','ixIU','ixAPI','ixMEC'], refId:398, description:{
						default_en:"The student chooses the content. Some will need help choosing and reducing their interests to topics that are manageable."
					}
		},
		cmplxThink:{
			id:"cmplxThink",title:"Complex Thinking", type: "process", indicators:['ixSH','ixPIM','ixTM','ixSCP','ixLE','ixMEC'], refId:406, description:{
						default_en:"Emphasize learning processes (verbs) that stress the use, rather than the acquisition of information (higher level thinking, critical thinking, creative thinking, etc.)."
					}
		},		
		expMeths:{
			id:"expMeths",title:"Expert Methods", type: "process", indicators:['ixPIM','ixTM','ixGC','ixRTW','ixSCP','ixAPI','ixHMP'], refId:408, description:{
						default_en:"Learning with and about methods used by experts in a discipline."
					}
		},		
		groupInt:{
			id:"groupInt",title:"Group Interaction", type: "process", indicators:['ixSH','ixISA','ixGC','ixSCP'], refId:410, description:{
						default_en:"Students collaborate with peers who have similar abilities and share their passions in order to enhance their social and leadership skills, learn perspective-taking and become more empathetic."
					}
		},		
		indvPurs:{
			id:"indvPurs",title:"Individual Pursuits", type: "process", indicators:['ixEIC','ixPIM','ixISA','ixIU','ixAPI','ixHMP'], refId:412, description:{
						default_en:"Individual projects on which students work relatively independently but with the support of a teacher or mentor available as needed."
					}
		},		
		inqBasLea:{
			id:"inqBasLea",title:"Inquiry-based learning", type: "process", indicators:['ixEIC','ixPIM','ixTM','ixRTW','ixSCP','ixIU','ixLE','ixAPI','ixHMP'], refId:414, description:{
						default_en:"Inductive reasoning processes are used to discover patterns, underlying principles and generalizations. Students take greater responsibility for their learning than in deductive learning experiences."
					}
		},		
		opEnd:{
			id:"opEnd",title:"Open-endedness", type: "process", indicators:['ixSH','ixEIC','ixPIM','ixISA','ixSCP','ixLE','ixAPI'], refId:417, description:{
						default_en:"Activities involve open-ended questions, activities, projects and methods. These have no predetermined correct outcome. They are provocative, stimulating students to think broadly."
					}
		},		
		pacProc:{
			id:"pacProc",title:"Pacing", type: "process", indicators:['ixPIM','ixTM','ixRTW','ixSCP','ixIU','ixLE','ixHMP'], refId:419, description:{
						default_en:"Students learn at a pace commensurate with their ability to go quickly through or deeply into content. Examples include pretesting, 'compacting', or 'telescoping' curriculum, or other forms of acceleration."
					}
		},		
		reasRefl:{
			id:"reasRefl",title:"Reasoning and Reflection", type: "process", indicators:['ixPIM','ixISA','ixGC','ixRTW','ixSCP','ixMEC'], refId:421, description:{
						default_en:"Students explain their conclusions and the reasoning that led to them as well as the metacognitive aspect of their thinking. They are encouraged to evaluate both the process and products of their own and others' thinking."
					}
		},		
		selSelProc:{
			id:"selSelProc",title:"Self-selected Process", type: "process", indicators:['ixEIC','ixPIM','ixTM','ixSCP','ixIU','ixLE','ixAPI','ixHMP'], refId:423, description:{
						default_en:"Students choose the ways they will learn. Some may need assistance identifying their preferences or following through on their choices."
					}
		},		
		procVariety:{
			id:"procVariety",title:"Variety", type: "process", indicators:['ixSH','ixEIC','ixTM','ixGC','ixRTW','ixSCP','ixLE','ixAPI'], refId:425, description:{
						default_en:"A range of methods of thinking and feeling involved in learning by using different types of problems, resources and technologies."
					}
		},				
		authAud:{
			id:"authAud",title:"Authentic Audiences", type: "product", indicators:['ixSH','ixEIC','ixPIM','ixGC','ixRTW','ixSCP','ixMEC'], refId:442, description:{
						default_en:"Results of the learning activity should be shared with real and appropriate audiences  to the greatest extent possible. This may involve the scientific community, the city council, a government agency, art critic, etc."
					}
		},				
		feedAssProd:{
			id:"feedAssProd",title:"Feedback and Assessment", type: "product", indicators:['ixSH','ixEIC','ixISA','ixRTW','ixSCP','ixMEC','ixHMP'], refId:444, description:{
						default_en:"Products should be assessed using real, predetermined procedures and criteria, and as often as possible, by a member or members of the real audience for the product. Students should also be encouraged or required to self-evaluate their products using the same criteria."
					}
		},				
		selSelProd:{
			id:"selSelProd",title:"Self-selected Product", type: "product", indicators:['ixEIC','ixPIM','ixTM','ixGC','ixLE','ixAPI','ixHMP'], refId:446, description:{
						default_en:"The student chooses an appropriate format for the product that reflects what was learned. Students' interests, strengths and prior experiences may influence these choices. Teachers may need to provide assistance in the selection and development of the product."
					}
		},				
		transProd:{
			id:"transProd",title:"Transformations", type: "product", indicators:['ixSH','ixEIC','ixTM','ixGC','ixRTW','ixLE'], refId:448, description:{
						default_en:"The results of the learning process should represent a \"conversion of known information into new entities - changes in meaning, significance, use, interpretation, mood, sensory qualities,or shape\" (Guilford, 1967)."
					}
		},						
		prodVariety:{
			id:"prodVariety",title:"Variety", type: "product", indicators:['ixEIC','ixPIM','ixGC','ixSCP','ixIU','ixLE','ixAPI','ixHMP'], refId:450, description:{
						default_en:"Students learn about and use different types of production techniques and media throughout the school year or term. They should also learn to select an appropriate format for the audience and content."
					}
		}
	}
};


