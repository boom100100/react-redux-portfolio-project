class SectionTitleChildrenController < ApplicationController
  def create
    my_params = {content: params[:content], description: params[:description], name: params[:name], section_title_id: SectionTitle.find_by(section_order: params[:section_order]).id, section_order: params[:section_order], child_order: params[:section_title_child][:child_order], type: params[:section_title_child][:type], url: params[:section_title_child][:url]}
    section_title_child = SectionTitleChild.new(my_params)
    if section_title_child.save!
      levelUp(section_title_child, nil, nil, nil, nil)
      render json: {section_title_child: section_title_child, type: section_title_child.type, project_id: section_title_child.section_title.project_id, section_order: section_title_child.section_title.section_order }
    end
  end

  def update
    my_params = {content: params[:content], description: params[:description], name: params[:name], section_title_id: SectionTitle.find_by(section_order: params[:section_order]).id, section_order: params[:section_order], child_order: params[:section_title_child][:child_order], type: params[:section_title_child][:type], url: params[:section_title_child][:url]}
    section_title_child = SectionTitleChild.find_by(id: params[:section_title_child_id])
    prev_section_title_id = section_title_child.section_title.id

    prev_section_order = section_title_child.section_order
    prev_child_order = section_title_child.child_order
    puts params
    if section_title_child.update!(my_params)
      next_section_order = section_title_child.section_order
      next_child_order = section_title_child.child_order
      levelUp(section_title_child, prev_section_order, prev_child_order, next_section_order, next_child_order)
      render json: {section_title_child: section_title_child, type: section_title_child.type, project_id: section_title_child.section_title.project_id, section_order: section_title_child.section_title.section_order, delete_id: section_title_child.id, prev_section_id: prev_section_title_id }
      #render json: {message: 'landed at SectionTitleChildrenController#update', params: params}
    end
  end

  def destroy
    section_title_child = SectionTitleChild.find_by!(id: params[:id].to_i)
    if section_title_child
      my_params = {content: section_title_child.content, description: section_title_child.description, id: section_title_child.id, name: section_title_child.name, section_title_id: section_title_child.section_title_id, section_order: section_title_child.section_order, child_order: section_title_child.child_order, type: section_title_child.type, url: section_title_child.url}
      section_title_child_copy = SectionTitleChild.new(my_params)
      project_id = section_title_child.section_title.project_id
      section_title_child.destroy

      render json: {message: 'Destroyed ' + section_title_child_copy.id.to_s, section_title_child: section_title_child_copy, project_id: project_id}
    end
    # render json: {message: 'landed at SectionTitleChildrenController#destroy', params: params, section_title_child: section_title_child}
  end

  private

  def levelUp(section_title_child, prevSectionOrder,prevChildOrder,nextSectionOrder,nextChildOrder)

    #if all orders are nil .nil?
    #if (prevSectionOrder.nil? && prevChildOrder.nil? && nextSectionOrder.nil? && nextChildOrder.nil?)
      #then change child orders where section orders of both children are ==
    if (prevSectionOrder.nil? && prevChildOrder.nil? && nextSectionOrder.nil? && nextChildOrder.nil?) || (prevSectionOrder == nextSectionOrder && prevChildOrder > nextChildOrder)
      SectionTitleChild.all.each {|child|
        child.child_order = child.child_order + 1 if (child != section_title_child) && (child.child_order >= section_title_child.child_order) && (child.section_title == section_title_child.section_title)
        child.save
      }



    # if all orders are == #it doesn't move
    # don't level up - break
    elsif (prevSectionOrder == nextSectionOrder) && (prevChildOrder == nextChildOrder)
      return



    #if only child_orders are != #same condition: #if section_orders are == and child_orders are !=
    #if (prevSectionOrder == nextSectionOrder && prevChildOrder != nextChildOrder)
    elsif (prevSectionOrder == nextSectionOrder && prevChildOrder != nextChildOrder)

        #subtract one from children's child_order value where section order is the same and where child_order is > than previous child order
      SectionTitleChild.all.each {|child|
        child.child_order = child.child_order - 1 if (child != section_title_child) && (child.child_order > prevChildOrder) && (child.section_title == section_title_child.section_title)
        child.save
      }

      #then, add one to where section order is the same and where child_order is >= to next child order
      SectionTitleChild.all.each {|child|
        child.child_order = child.child_order + 1 if (child != section_title_child) && (child.child_order >= nextChildOrder) && (child.section_title == section_title_child.section_title)
        child.save
      }



    #if only section_orders are != #same condition: #if section_orders are != and child_orders are ==
    #section change
    elsif (prevSectionOrder != nextSectionOrder)
      #for children in previous section, decrement child order if child order is > prevChildOrder
      SectionTitleChild.all.each {|child|
        child.child_order = child.child_order - 1 if (child != section_title_child) && (child.child_order > prevChildOrder) && (child.section_title == section_title_child.section_title)
        child.save
      }

      #for children in current section, increment child order if child order is >= next child order
      # if all are !=
      SectionTitleChild.all.each {|child|
        child.child_order = child.child_order + 1 if (child != section_title_child) && (child.child_order >= nextChildOrder) && (child.section_title == section_title_child.section_title)
        child.save
      }
    end
  end

end
