# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_a = User.create(email: 'a@a.a', password: 'aaaaaa', password_confirmation: 'aaaaaa')
user_b = User.create(email: 'b@b.b', password: 'bbbbbb', password_confirmation: 'bbbbbb')
user_c = User.create(email: 'c@c.c', password: 'cccccc', password_confirmation: 'cccccc')
user_d = User.create(email: 'd@d.d', password: 'dddddd', password_confirmation: 'dddddd')
user_e = User.create(email: 'e@e.e', password: 'eeeeee', password_confirmation: 'eeeeee')

project_a = Project.create(name: 'a', abstract: 'a', user: user_a)

title_a = SectionTitle.create(name: 'a', project: project_a)
title_b = SectionTitle.create(name: 'b', project: project_a)

prelim_data_a = PreliminaryDatum.create(name: 'a', url: 'https://google.com', description: 'a', content: 'a', section_title: title_a)
prelim_data_b = PreliminaryDatum.create(name: 'b', url: 'https://google.com', description: 'b', content: 'b', section_title: title_b)

research_data_a = ResearchDatum.create(name: 'a', url: 'https://google.com', description: 'a', content: 'a', section_title: title_a)
research_data_b = ResearchDatum.create(name: 'b', url: 'https://google.com', description: 'b', content: 'b', section_title: title_b)

random_data_a = RandomDatum.create(name: 'a', url: 'https://google.com', description: 'a', content: 'a', section_title: title_a)
random_data_b = RandomDatum.create(name: 'b', url: 'https://google.com', description: 'b', content: 'b', section_title: title_b)

graph_a = Graph.create(name: 'a', url: 'https://google.com', description: 'a', section_title: title_a)
graph_b = Graph.create(name: 'b', url: 'https://google.com', description: 'b', section_title: title_b)
