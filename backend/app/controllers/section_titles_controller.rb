class SectionTitlesController < ApplicationController
  def create
    params.delete :section_title

    my_params = {name: params[:name], section_order: params[:section_order], project_id: params[:project_id], section_title_children: params[:section_title_children]}
    section_title = SectionTitle.new(my_params)
    # order = section_title.section_order

    if section_title.save!
      #update following section_orders by adding one
      SectionTitle.all.each{|title|
        title.section_order = title.section_order + 1 if (title != section_title) && (title.section_order >= section_title.section_order)
        title.save
        #children must match parent
        title.section_title_children.each{|child|
          child.section_order = child.section_title.section_order
          child.save
        }
      }
      # render json: {message: 'Created.', section_title: section_title, params: params}
      render json: {message: 'Created.', section_title: section_title}
    end
  end

  def update
    section_title = SectionTitle.find_by(id: params[:id].to_i)
    if section_title
      section_title.name = params[:name]
      section_title.section_order = params[:section_order]
      if section_title.save!
        SectionTitle.all.each{|title|
          title.section_order = title.section_order + 1 if (title != section_title) && (title.section_order >= section_title.section_order)
          title.save
          #children must match parent
          title.section_title_children.each{|child|
            child.section_order = child.section_title.section_order
            child.save
          }
        }

        render json: {message: 'Updated.', section_title: section_title, params: params}
      end
    end
  end

  def destroy
    render json: {message: 'landed at SectionTitlesController#destroy'}
  end
end
