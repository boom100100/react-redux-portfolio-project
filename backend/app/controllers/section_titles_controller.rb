class SectionTitlesController < ApplicationController
  def create
    params.delete :section_title

    my_params = {description: params[:description], name: params[:name], section_order: params[:section_order], project_id: params[:project_id], section_title_children: params[:section_title_children]}
    section_title = SectionTitle.new(my_params)
    # order = section_title.section_order

    if section_title.save!
      #update following section_orders by adding one
      level(section_title, 'UP')
      render json: {message: 'Created.', section_title: section_title}
    end
  end

  def update
    section_title = SectionTitle.find_by(id: params[:id].to_i)
    if section_title
      section_title.description = params[:description]
      section_title.name = params[:name]

      if section_title.save! && section_title.section_order != params[:section_order]
        #subtract 1 from each following section_order val
        #find max section order
        #adds 1 to it
        max = level(section_title, 'DOWN')


        #// const max = section_titles.reduce(function(a, b){console.log('a.section_order', a.section_order);return Math.max(a.section_order, b.section_order)});


        #change order
        # params[:section_order] > max ? section_title.section_order = max : section_title.section_order = params[:section_order]
        section_title.section_order = params[:section_order]

        if section_title.save!
          #add one to each following section_order val
          level(section_title, 'UP')
        end

        render json: {message: 'Updated.', section_title: section_title, section_titles: SectionTitle.all.select{|x| x.project == section_title.project}, params: params}
      else
        render json: {message: 'Updated.', section_title: section_title, section_titles: SectionTitle.all.select{|x| x.project == section_title.project}, params: params}
      end

    end
  end

  def destroy
    section_title = SectionTitle.find_by!(id: params[:id].to_i)
    if section_title
      # my_id = section_title.id


      my_params = {name: section_title.name, section_order: section_title.section_order, project_id: section_title.project_id, section_title_children: section_title.section_title_children}
      section_title_copy = SectionTitle.new(my_params)
      section_title_copy.id = section_title.id
      level(section_title, 'DOWN')

      section_title.destroy

      render json: {message: 'Destroyed ' + section_title_copy.id.to_s, section_title: section_title_copy}
    end
  end

  private

  def level(section_title, direction)
    @max = 0
    SectionTitle.all.each{|title|
      if direction == 'UP'
        title.section_order = title.section_order + 1 if (title != section_title) && (title.section_order >= section_title.section_order)
      elsif direction == 'DOWN'
        title.section_order = title.section_order - 1 if (title != section_title) && (title.section_order >= section_title.section_order)
      end
      title.save
      #children must match parent
      title.section_title_children.each{|child|
        child.section_order = child.section_title.section_order
        child.save
      }
      @max = title.section_order if title.section_order > @max
    }
    @max
  end
end
