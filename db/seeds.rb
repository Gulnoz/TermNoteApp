# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1=User.create(:name=>'Andy', :email=>'andy@email.com', :password=>'abc123')
user2=User.create(:name=>'Dora', :email=>'dora@email.com', :password=>'abc123')
user3=User.create(:name=>'Mart', :email=>'mart@email.com', :password=>'abc123')


apple=Word.create(:name=>'apple', :imgurl=>'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ9t5bXv_sj6SLjIP1hQ8xy5q_BcJWSmlCeE2rs8JZu0bAtv1B9f-dRwwQ9omhrBlvgbOkfFLdBL3tVPFKQpkKY9JM-uxJ7TwUEbbsSR7z_pnblRSRsXEYdlg&usqp=CAc', :definition=>'apple', :example=>'This is red apple.',:user_id=>user1.id)

note1=Note.create(:description=>'This is my first note about apple.', :word_id=>apple.id)

# hello