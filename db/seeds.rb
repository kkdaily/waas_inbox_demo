# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# 9.times do |i|
#   Recipe.create(
#     name: "Recipe #{i + 1}",
#     ingredients: '227g tub clotted cream, 25g butter, 1 tsp cornflour,100g parmesan, grated nutmeg, 250g fresh fettuccine or tagliatelle, snipped chives or chopped parsley to serve (optional)',
#     instruction: 'In a medium saucepan, stir the clotted cream, butter, and cornflour over a low-ish heat and bring to a low simmer. Turn off the heat and keep warm.'
#   )
# end
Message.destroy_all
Founder.destroy_all
Candidate.destroy_all
User.destroy_all
Company.destroy_all

companies = Company.create([
  { name: 'Recurrency', logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/c5622f9120d544c1761f86956eb466ab1225512a.png', website_url: 'http://www.recurrency.ai/', industry: 'B2B Software', location: 'Los Angeles, CA', size: 9, batch: 'S20' },
  { name: 'Flockjay', logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/caa553eb14c2f5a39805e74368d4fcc3974c9abe.png', website_url: 'https://flockjay.com', industry: 'Education', location: 'San Francisco', size: 25, batch: 'W19' },
  { name: 'Virtually', logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/f8d1e8e71d6b6cf0e4a79033fc4a3e23c6a48f8c.png', website_url: 'https://www.tryvirtually.com', industry: 'Education', location: 'New York', size: 5, batch: 'S20' },
  { name: 'Y Combinator', logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/2db694dd7905db37d037821a2fdaf9fa0708a964.png', website_url: 'https://ycombinator.com', industry: 'Unspecified', location: 'Mountain View', size: 2, batch: nil },
  { name: 'Mutiny', logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/0e506d56d7c881b7aaf4341d22a276be88c1ec16.png', website_url: 'https://www.mutinyhq.com', industry: 'B2B Software', location: 'San Francisco', size: 10, batch: 'S18' },
  { name: 'Stayflexi', logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/ea9c0911639e8901e9015db16df15149fbf89e69.png', website_url: 'https://business.stayflexi.com', industry: 'Consumer', location: 'San Francisco', size: 15, batch: 'W21' },
  { name: 'Taskade', logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/6902f9194abc25bd591410dc7d36f885a97b62e1.png', website_url: 'https://www.taskade.com', industry: 'B2B Software', location: 'San Francisco', size: 7, batch: 'S19' },
  { name: 'Aptible', logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/17547ff6e0fe5d75c99f92fdc3b9c13fa6712bd5.png', website_url: 'https://www.aptible.com', industry: 'Healthcare', location: 'San Francisco', size: 50, batch: 'S14' },
  { name: 'SafetyWing', logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/ddb944ea80d22a29ddc64949877063e0dd8d1343.png', website_url: 'https://www.safetywing.com', industry: 'Financial Technology', location: 'San Francisco', size: 20, batch: 'W18' },
  { name: 'ScholarMe', logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/f9fb7f93f02b6ffe53c14d0421b44bb1722a372f.png', website_url: 'https://www.scholarme.co', industry: 'Financial Technology', location: 'Toronto, Canada', size: 8, batch: 'S19' },
  { name: 'Sketchbox', logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/2df5faaf3a1b84d44ea388d53291a399c7f6c297.png', website_url: 'https://www.sketchbox3d.com', industry: 'Consumer', location: 'San Francisco', size: 20, batch: 'W18' },
  { name: 'Pickle', logo_url: 'https://bookface-images.s3.amazonaws.com/small_logos/33799dbde9a7b6ca98e81d00a266631d773790d6.png', website_url: 'https://www.pickleai.com', industry: 'B2B Software', location: 'Salt Lake City, UT', size: 5, batch: 'W21' },
])

users = User.create([
  # founders
  { first_name: 'Mylie', last_name: 'Brewer', username: 'mbrewer', password: 'password', profile_image_url: 'https://randomuser.me/api/portraits/women/8.jpg' },
  { first_name: 'Kristina', last_name: 'Jackson', username: 'kjackson', password: 'password', profile_image_url: 'https://randomuser.me/api/portraits/women/48.jpg' },
  { first_name: 'Bryce', last_name: 'Munoz', username: 'bmunoz', password: 'password', profile_image_url: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { first_name: 'Lawson', last_name: 'Franco', username: 'lfranco', password: 'password', profile_image_url: 'https://randomuser.me/api/portraits/men/31.jpg' },
  { first_name: 'Amrit', last_name: 'Whitworth', username: 'awhitworth', password: 'password', profile_image_url: nil },
  { first_name: 'Tiegan', last_name: 'Bartlett', username: 'tbartlett', password: 'password', profile_image_url: 'https://randomuser.me/api/portraits/women/76.jpg' },
  { first_name: 'Alec', last_name: 'Hudson', username: 'ahudson', password: 'password', profile_image_url: nil },
  { first_name: 'Polly', last_name: 'Weir', username: 'pweir123', password: 'password', profile_image_url: nil },
  { first_name: 'Meerab', last_name: 'Compton', username: 'mcompton', password: 'password', profile_image_url: nil },
  { first_name: 'Ellen', last_name: 'Chang', username: 'echang', password: 'password', profile_image_url: 'https://randomuser.me/api/portraits/women/90.jpg' },
  { first_name: 'Ioana', last_name: 'Irvine', username: 'iirvine', password: 'password', profile_image_url: 'https://randomuser.me/api/portraits/women/36.jpg' },
  { first_name: 'Noach', last_name: 'Sahar', username: 'nsahar', password: 'password', profile_image_url: 'https://randomuser.me/api/portraits/men/36.jpg' },

  # candidates
  { first_name: 'Ruby', last_name: 'Smith', username: 'rsmith', password: 'password', profile_image_url: 'https://randomuser.me/api/portraits/women/47.jpg' },
  { first_name: 'George', last_name: 'Garcia', username: 'ggarcia', password: 'password', profile_image_url: 'https://randomuser.me/api/portraits/men/4.jpg' },
])

candidates = Candidate.create([
  { user_id: users[12].id, status: 'active' },
  { user_id: users[13].id, status: 'passive' }
])

founders = Founder.create([
  { user_id: users[0].id, company_id: companies[0].id },
  { user_id: users[1].id, company_id: companies[1].id },
  { user_id: users[2].id, company_id: companies[2].id },
  { user_id: users[3].id, company_id: companies[3].id },
  { user_id: users[4].id, company_id: companies[4].id },
  { user_id: users[5].id, company_id: companies[5].id },
  { user_id: users[6].id, company_id: companies[6].id },
  { user_id: users[7].id, company_id: companies[7].id },
  { user_id: users[8].id, company_id: companies[8].id },
  { user_id: users[9].id, company_id: companies[9].id },
  { user_id: users[10].id, company_id: companies[10].id },
  { user_id: users[11].id, company_id: companies[11].id },
])

messages_content = [
# message 1
"
Hi Ruby,

We're looking to innovate as much as possible in the coming years, and with that challenge comes a whole host of opportunities for our engineering teams. The team is growing as our business continues to expand and we need great engineers like yourself to help us in that growth!

If you're interested, let me know, and we can set up a time for a quick chat.

Best,

Mylie Brewer
",

# message 2
"
Hi Mylie,

Thanks so much for reaching out. I’m available to speak this week on Wednesday and Friday after 1pm EST. Please let me know if you need anything else in the meantime.

Looking forward to discussing the role with you!
Ruby
",

# message 3
"
Hi Ruby, just following up on my previous message to see if you were interested?
",

# message 4
"
Hi Ruby,

I hope you are doing well!

Do you have a few minutes for a call? I would love to tell you more about our team and what we're tackling.

Let me know what works for you. Looking forward to it!

Kristina Jackson
",

# message 5
"
Hi Ruby,

Hope you are doing well! I reached out recently but I realize messages get lost in the shuffle and these things are always about timing so I just wanted to check back in.

Let me know if you would be interested in a call to learn more about our team.

Thanks,

Kristina Jackson
",

# message 6
"
Hi Ruby,

I came across your profile and thought you might be a fit for some roles we are hiring for and wanted to take a moment to introduce myself and Pickle to you as we are a growing company using technology to disrupt the home security space and are looking for great engineers to join our team.

If you're interested, I’d love to set up a quick call to share a little bit about our company, the roles we are hiring for and learn more about what you’re looking for either now or in the future.
",

# message 7
"
Dear Ruby,

I hope this message finds you well today. The reason I wanted to reach out today is because we're working on a fast-growing, fintech startup. In the role you would be working in a diverse team of engineers of varying experience levels to deliver quality software that is used by customers and colleagues. The Tech you would be using is primarily Javascript (React, Node) and cloud tech like AWS.

I am not sure of your current situation, but would you be open to speaking more about this opportunity? I hope to hear back soon.

-Bryce
",

# message 8
"
Hi Ruby, 👋

I hope all is well. I saw your recent experience as a Software Engineer with Cool Company and I wanted to reach out.

Please feel free to schedule time on my calendar at your earliest convenience. Looking forward to hearing from you!

Take Care,

Lawson Franco
",

# message 9
"
Hey Ruby,

Does the idea of working on software that is being used by millions of users around the world excite you?

Mutiny is the best-in-class technology platform that provides unrivaled data coverage, accuracy, and depth of information to marketing, sales, and recruiting teams.

This is an opportunity to learn and explore new technologies and work with a massive and rich dataset.

If you're interested in hearing more about this role just reply back with your availability to hop on a short phone call and we can further connect!

Amrit Whitworth
",

# message 10
"
Dear Ruby,

Stayflexi is in need of Senior Front-End and Full-Stack engineers and I thought you would be a great fit! Stayflexi is building tools to help organizations create engaging, purpose-driven workplaces.

The current technical environment is React based.

Would you be interested in learning more?

Thank you,

Tiegan Bartlett
",

# message 11
"
Hi Ruby,

I came across your profile and wanted to see if you’re interested in learning more about an opening on our Applications team here at Taskade.

Let me know if you're interested in a quick 15 minute chat to learn more! Looking forward to hearing from you.

Best,
Alec
",

# message 12
"
Hi Ruby!

It’s Polly from Aptible :). We saw immense success in 2020 and we plan on making 2021 even bigger. 

Since our work lives in cloud architecture and we already have a robust remote culture in place, we’ve been very fortunate that the Covid-19 crisis has not been as disruptive as it could have been. 

I’d love to chat with you and learn what your interests are!
",

# message 13
"
Hi Ruby,

I hope you had a great weekend!

We just got in this Front End Developer role, and I wanted to see if it is something you would be interested in?

Do you have a few moments to discuss it over the phone today?

Thanks!

Meerab
",

# message 14
"
Hi Ruby,

I came across your profile and saw that you recently moved into your position at Cool Company, I hope all is well. I am reaching out because I currently have a UI lead position available in Boston, Ma.

I look forward to speaking with you Ruby!

Regards,

Ellen Chang
",

# message 15
"
Hi Ruby,

Sketchbox is currently looking for Technical Solution Engineers for our Boston team and I feel that your background in JavaScript and HTML would set you up perfectly for success.

It is a very unique role that is critical to the integration and management of our technology - it requires a large amount of internal interaction across multiple groups, and external client engineering teams. This is a great opportunity to have more client interactions and serve as a product knowledge expert for the entire company.

We have a best in class product, amazing culture, beautiful office in downtown Boston, and a slide from the 15th to the 14th floor!

If interested, what day would work best for you to connect?

Ioana Irvine
",

# message 16
"
Hi,

I love what Recurrency is doing, and I would love to help scale out your architecture.

Best,
George
"
]

messages = Message.create([
  { sender_id: users[0].id, receiver_id: users[12].id, content: messages_content[0], created_at: 2.days.ago },
  { sender_id: users[12].id, receiver_id: users[0].id, content: messages_content[1], created_at: 12.seconds.ago },

  { sender_id: users[1].id, receiver_id: users[12].id, content: messages_content[3], created_at: 7.days.ago },
  { sender_id: users[1].id, receiver_id: users[12].id, content: messages_content[4], created_at: 3.days.ago },

  { sender_id: users[11].id, receiver_id: users[12].id, content: messages_content[5], created_at: 6.days.ago },

  { sender_id: users[2].id, receiver_id: users[12].id, content: messages_content[6], created_at: 10.days.ago },
  { sender_id: users[3].id, receiver_id: users[12].id, content: messages_content[7], created_at: 5.minutes.ago },
  { sender_id: users[4].id, receiver_id: users[12].id, content: messages_content[8], created_at: 4.days.ago },
  { sender_id: users[5].id, receiver_id: users[12].id, content: messages_content[9], created_at: 7.days.ago },
  { sender_id: users[6].id, receiver_id: users[12].id, content: messages_content[10], created_at: 1.month.ago },
  { sender_id: users[7].id, receiver_id: users[12].id, content: messages_content[11], created_at: 21.days.ago },
  { sender_id: users[8].id, receiver_id: users[12].id, content: messages_content[12], created_at: 3.days.ago },
  { sender_id: users[9].id, receiver_id: users[12].id, content: messages_content[13], created_at: 9.days.ago },
  { sender_id: users[10].id, receiver_id: users[12].id, content: messages_content[14], created_at: 30.minutes.ago },
  { sender_id: users[13].id, receiver_id: users[0].id, content: messages_content[15], created_at: 3.hours.ago },
])